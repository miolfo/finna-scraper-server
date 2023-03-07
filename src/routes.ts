import express from 'express';
import {getData} from "./controllers/scrapercontroller";

const router = express.Router();

router.get('/data', getData);
export default router