import { Request, response, Response } from "express";

import { dateTimeFormatter, iso8601, isoDate, parseDate, toISO8601 } from "../../utils/Mixins";
import dotenv from 'dotenv';
import Clockiwar from "../../entity/Clockiwar/clockiwar_modal";
import AxiosUtil from "../../utils/AxiosUtil";
import ExcelPrinter from "../../utils/ExcelPrint";
import { DataHolder } from "../../types/utilTypes";
dotenv.config();

export default class ClockifyController {
    static apiKey = process.env.API_KEY as string

    async findUserData (req:Request, res:Response) {
        try {
            let query :any = req.query
            let workspaceId = query.workspaceId ?? process.env.WORKSPACE as string;

            const fetchedData = await ClockifyController.fetchDatas({...query, workspaceId : workspaceId})
           
            res.status(200).json({ count : fetchedData.rows.length, rows : fetchedData.rows});

        } catch (error) {
            res.json({ message: 'Error', error : error });
        }
    }

    async print (req:Request, res:Response) {
        try {
            let query :any = req.query
            let workspaceId = query.workspaceId ?? process.env.WORKSPACE as string;

            const fetchedData = await ClockifyController.fetchDatas({...query, workspaceId : workspaceId})
            
            const printDocument = ExcelPrinter.print('WAR_TEMPLATE', fetchedData)
            res.status(200).json(printDocument);
        } catch (error) {
            res.json({ message: 'Error', error : error });
        }
    }

    static async fetchDatas (jsonData : any) {
        const data : any = await AxiosUtil().GET({
            link : `https://api.clockify.me/api/v1/workspaces/${jsonData.workspaceId}/users`,
            params : {email : jsonData.email},
            headers : {'X-Api-Key': ClockifyController.apiKey}, 
        })
        const {name, id} = data[0]
   
        let startDate = `${isoDate(jsonData?.start)}T00:00:00Z`
        let endDate = `${isoDate(jsonData?.end)}T24:00:00Z`

        const listOfData : [] = await AxiosUtil().GET({
            link : `https://api.clockify.me/api/v1/workspaces/${jsonData.workspaceId}/user/${id}/time-entries`,
            params : {start : startDate, end : endDate},
            headers : {'X-Api-Key': ClockifyController.apiKey}, 
        })
 
        const sortedData = listOfData
            .map(Clockiwar.toModel)
            .sort(
                (a:DataHolder, b:DataHolder) => parseDate(a.dateTime).getTime() - parseDate(b.dateTime).getTime()
            );
        
        const totalDuration = sortedData.reduce((acc, curr: DataHolder) => {
            const [hours, minutes, seconds] = curr.Duration.split(':').map(Number);
            const durationSeconds = hours * 3600 + minutes * 60 + seconds;
            return acc + durationSeconds;
        }, 0);

        const isoDuration = toISO8601(totalDuration)


        const period = `${dateTimeFormatter(new Date(startDate), 'MM/DD')} - ${dateTimeFormatter(new Date(endDate), 'MM/DD')} ${dateTimeFormatter(new Date(endDate), 'YYYY')}`

        return {
            rows : sortedData,
            fullname : name,
            job : jsonData.job ?? '',
            period : period,
            totalDuration :  iso8601(isoDuration),
            blank : ''
        };
    }
}