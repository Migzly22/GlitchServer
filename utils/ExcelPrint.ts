import { readFileSync } from "fs";
import path from "path";
import XlsxTemplate from "xlsx-template";

export default class ExcelPrinter {
    static print(template:string, data : any) {
      const file = readFileSync(`${__dirname}/../templates/${template}.xlsx`);
      let excelTemplate = new XlsxTemplate(file);
      excelTemplate.substitute(1, data);
      return excelTemplate.generate("base64" as any);
    }
}