import { Request, Response, NextFunction } from 'express';
import {WebDriver, Builder, Key, By, until} from "selenium-webdriver";

export const getData = async (req: Request, res: Response, next: NextFunction) => {

    let driver = await new Builder().forBrowser("firefox").build();
    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('You did it!!', Key.RETURN);
    } finally {
        await driver.quit();
    }
    return res.status(200).json({
        message: "Hello world"
    });
};