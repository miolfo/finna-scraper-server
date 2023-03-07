import { Request, Response, NextFunction } from 'express';
import {Builder, By} from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox"
export const getAvailability = async (req: Request, res: Response, next: NextFunction) => {

    let driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new firefox.Options().headless().windowSize({
            width: 640,
            height: 480
        }))
        .build();
    let text;
    try {
        await driver.get('https://www.finna.fi/Record/helmet.2527262');
        let test = await driver.findElement(By.className('record-title visible-xs'));
        text = await test.getText()
    } finally {
        await driver.quit();
    }
    return res.status(200).json({
        message: text
    });
};