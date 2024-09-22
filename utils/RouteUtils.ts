import { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

export class RouteUtils {

    static init(app : Application, currentDir : string, folder : string){
        return new Promise<void>((resolve, reject)=>{
            try {
                const folderName = path.join(currentDir, folder);
                fs.readdirSync(folderName).forEach((dir)=>{
                    var routeDir = path.join(folderName, dir)

                    fs.readdirSync(routeDir).forEach((file)=>{
                        let fullPath = path.join(routeDir, file);
                        if (fullPath.includes(".ts") || fullPath.includes(".js")) {
                            let pathName = fullPath.toLowerCase().replace('.ts','').replace('.js','').split('\\').join('/')
                            console.log(pathName);
                        }
                        // console.log("TESTING ",fullPath.toLowerCase(),['.js', '.ts'].includes(fullPath.toLowerCase()), 
                        //     fullPath.toLowerCase().includes(['.ts','.js'])
                        // )
                    })
                })
                resolve()
            } catch (error) {
                console.log("Error", error)
                reject();
            }
        })
    }
}