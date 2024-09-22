import { Request, Response } from "express";

export default class ClockifyController {

    async findUserData (req:Request, res:Response) {
        try {
            res.json({ message: 'List of users' });
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

}