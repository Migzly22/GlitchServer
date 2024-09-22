import { Application } from "express";
import { ApplicationTypes } from "../types/ApplicationTypes";
import express, {Request, Response}  from 'express';
import cors from 'cors';
import { RouteUtils } from "./RouteUtils";

export default class ServerUtils{
    static app:Application;

    public static async init(port:number, settingConfig?: ApplicationTypes){
        ServerUtils.app = express();

        ServerUtils.app.use(cors())
        ServerUtils.app.use(express.json())

        ServerUtils.app['get']('/', (req:Request, res:Response) => {
            res.send('Hello, TypeScript!');
        });

        await RouteUtils.init(ServerUtils.app, process.cwd(), 'routes');

        ServerUtils.app.listen(port, () => {
            console.log(`Server is running on port ${port} ${process.cwd()}`);
        });
    }
    
    
}