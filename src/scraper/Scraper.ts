import {Builder, By, until} from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

export const checkAvailability = async (finnaUrl: string) => {
    let driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new firefox.Options().headless().windowSize({
            width: 640,
            height: 480
        }))
        .build();
    let text = '';
    try {
        await driver.get(finnaUrl);
        //Wait until holdings- info is loaded
        let holdingsTitle = await driver.wait(until.elementLocated(By.className('holdings-title')),10000);
        let allHoldings = await driver.wait(until.elementsLocated(By.xpath('//div[contains(@class, \'holdings-details\')]/span')), 10000);
        for (const element of allHoldings) {
            const value = await element.getText()
            text += value + ", "
        }
    } finally {
        await driver.quit();
    }
    return text;
}