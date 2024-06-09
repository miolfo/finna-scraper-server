import http from 'http';
import express, { Express } from 'express';
import {getAvailability, ping} from "./controllers/ScraperController";
import {getDriver} from "./scraper/Scraper";

const router: Express = express();

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

router.get('/api/availability', getAvailability);
router.get('/api/ping', ping);

const httpServer = http.createServer(router);
const port: any = process.env.PORT ?? 8080;
httpServer.listen(port, () => console.log(`The server is running on port ${port}`));

getDriver()
