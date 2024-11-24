import { DataHolder } from "../types/modelTypes"
  
export function parseDate(dateString:any) : any {
      return new Date(dateString.replace('T', ' '));
  }
  
export function iso8601(durationString : string){
    return ["H","M","S"].map((data:any) => {
      const inputs = durationString.match(new RegExp("(\\d+)" + data)) 
      return (inputs ? inputs[1] : "0").padStart(2, '0')
    }).join(":")
  }


export const dateTimeFormatter = (date : Date, type ?: string ) => {
    let dates = new Date(date) 
    let dateData : any;

    switch (type) {
        case "Time":
            dateData = {
                hour: '2-digit',
                minute: '2-digit',
            }
            break;
        default:
            dateData = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }
            break;
    }

    dateData.timeZone = 'Asia/Manila'
    return dates.toLocaleString('en-US', dateData);
}

//format date to => YYYY-MM-DD
export const isoDate = (data:Date | string) =>{
    const date = new Date(data);
    const localeDateString = date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
    });

    const [month, day, year] = localeDateString.match(/\d+/g)!;
    return `${year}-${month}-${day}`;
}