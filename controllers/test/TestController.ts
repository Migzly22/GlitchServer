import { Request, Response } from "express";

export default class TestController {

    async findAll (req:Request, res:Response) {
        res.json({ message: 'List of users' });
    }

    async findById (req:Request, res:Response) {
        const { id } = req.params;
        res.json({ message: `User with ID: ${id}` });
    }

}