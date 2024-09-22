import { NextFunction, Request, Response } from "express";

export interface RouteTypes {
    method : string,
    path : string,
    controller : (req: Request, res: Response, next: NextFunction)=> Promise<void | ResponseType>
} 
export type HttpMethodsType = 'get' | 'post' | 'put' | 'patch' | 'delete'