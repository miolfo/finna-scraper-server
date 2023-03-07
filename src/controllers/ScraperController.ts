import { Request, Response, NextFunction } from 'express';
import {checkAvailability} from "../scraper/Scraper";
export const getAvailability = async (req: Request, res: Response, next: NextFunction) => {

    let text = await checkAvailability('https://www.finna.fi/Record/helmet.1661329')
    return res.status(200).json({
        statuses: text
    });
};