import express from 'express';
import scrapperController from '../controllers/scrapper';
import solveCaptcha from '../middlewares/solveCaptcha';

const router = express.Router();

router.get('/', solveCaptcha, scrapperController);

export = router;
