import { Request, Response } from "express";
import { AGET } from "../../utils/AxiosUtil";
import { dateTimeFormatter, iso8601, isoDate, parseDate } from "../../utils/Mixins";
import dotenv from 'dotenv';
import { DataHolder } from "../../types/modelTypes";
dotenv.config();

export default class ClockifyController {
    static apiKey = process.env.API_KEY as string

    async findUserData (req:Request, res:Response) {
        try {
            let query :any = req.query
            let workspaceId = query.workspaceId ?? process.env.WORKSPACE as string;

            const {id} = (await AGET(`https://api.clockify.me/api/v1/workspaces/${workspaceId}/users?email=${query.email}`,{'X-Api-Key': ClockifyController.apiKey}))[0];
            
            let startDate = `${isoDate(query?.start)}T00:00:00Z`
            let endDate = `${isoDate(query?.end)}T24:00:00Z`
            console.log(query, id, workspaceId)
            const listOfData = await AGET(`https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/${id}/time-entries?start=${startDate}&end=${endDate}`,{'X-Api-Key': ClockifyController.apiKey})


            const sortedData = listOfData.map((data:any) => ClockifyController.jsonFormatter(data)).sort((a:DataHolder, b:DataHolder) => parseDate(a.dateTime).getTime() - parseDate(b.dateTime).getTime());
            
            res.json({ count : sortedData.length, rows : sortedData});
        } catch (error) {
            res.json({ message: 'Error', error : error });
        }
    }

    async print (req:Request, res:Response) {
        try {
            const { id } = req.params;
            res.json({ message: `User with ID: ${id}` });
        } catch (error) {
            res.json({ message: 'Error', error : error });
        }
    }

    static jsonFormatter = (jsonData : any) : DataHolder => {
        const start = jsonData?.timeInterval?.start
        const end = jsonData?.timeInterval?.end
        const description = jsonData?.description
        const date = dateTimeFormatter(start)
        const duration = iso8601(jsonData?.timeInterval?.duration)
        
        return {
            Date: date,
            dateTime : start,
            Task: description,
            Start: dateTimeFormatter(start, "Time"),
            End: dateTimeFormatter(end, "Time"),
            Duration: duration
        }
    }
}