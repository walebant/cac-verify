import express from 'express';
import controller from '../controllers/scrapper';
import solveCaptcha from '../middlewares/solveCaptcha';
const router = express.Router();

router.get('/', solveCaptcha, controller.scrapper);

export = router;
