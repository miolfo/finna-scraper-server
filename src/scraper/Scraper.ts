import {Builder, By, until, WebDriver} from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

type Status = 'ORDERED' | 'UNAVAILABLE' | 'AVAILABLE' | 'WAITING' | 'IN_TRANSIT' | 'UNKNOWN'


//TODO: Include amount available, or closest return date in return type objects
const parseStatus = (holdingsText: string): Status => {
    if(holdingsText.toLowerCase().includes('tilattu')) {
        return 'ORDERED';
    } else if(holdingsText.toLowerCase().includes('odottaa noutoa')) {
        return 'WAITING';
    } else if(holdingsText.toLowerCase().includes('saatavissa')) {
        return 'AVAILABLE';
    } else if(holdingsText.toLowerCase().includes('kuljetuksessa')) {
        return 'IN_TRANSIT';
    } else if(holdingsText.toLowerCase().includes('eräpäivä')) {
        return 'UNAVAILABLE';
    } else {
        return 'UNKNOWN';
    }
}

export const checkAvailability = async (finnaUrl: string): Promise<Status[]> => {

    let statuses: Status[] = [];
    const driver = await getDriver();
    await driver.get(finnaUrl);
    //Wait until holdings- info is loaded
    await driver.wait(until.elementLocated(By.className('holdings-title')),10000);
    const allHoldings = await driver.findElements(By.xpath('//div[contains(@class, \'holdings-details\')]/span'))
    for (const element of allHoldings) {
        const value = await element.getText();
        statuses.push(parseStatus(value));
    }
    return statuses;
}

let driver: WebDriver | undefined = undefined
const getDriver = async (): Promise<WebDriver> => {
    if (!driver) {
        const opts = new firefox.Options()
        opts.addArguments('-headless')
        opts.windowSize({
            width: 640,
            height: 480
        })
        driver = await new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(opts)
            .build();
    }
    return driver
}