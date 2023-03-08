import { Request, Response, NextFunction } from 'express';
import {checkAvailability} from "../scraper/Scraper";
export const getAvailability = async (req: Request, res: Response, next: NextFunction) => {

    const url = `https://www.finna.fi/Record/${req.query.id}`
    let text = await checkAvailability(url)
    return res.status(200).json({
        statuses: text
    });
};

export const ping = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "pong"
    });
}