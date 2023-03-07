import express from 'express';
import {getData} from "./controllers/scrapercontroller";

const router = express.Router();

router.get('/posts', getData);
export default router