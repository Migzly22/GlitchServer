import { dateTimeFormatter, iso8601 } from "../../utils/Mixins"

export default class Clockiwar {
    static toModel(jsonData : any){
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