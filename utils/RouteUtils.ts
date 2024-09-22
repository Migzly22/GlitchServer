import express, { Application, Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { HttpMethodsType } from "../types/RouteTypes";



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

                            let listofName =  fullPath.toLowerCase().replace('.ts','').replace('.js','').split('\\')
                            let pathName = listofName.join('/')
                            let endpoint = `/${dir}/${listofName[listofName.length -1]}`

                            import(pathName).then((routerClass) => {
                                
                                let routeData = new routerClass.default()
                                let routes: Router = express.Router();

                                routeData.getRoutes().map((data:any) =>{
                                    let method :HttpMethodsType = data.method.toLowerCase() as HttpMethodsType
                                    routes[method](data.path, data.controller);
                                })
                                app.use(endpoint,routes)
                                console.log("Initializing endpoint:", endpoint)
                            })
                        }
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