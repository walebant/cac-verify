import express from 'express';
import verifyController from '../controllers/verify';
import solveCaptcha from '../middlewares/solveCaptcha';

const router = express.Router();

router.get('/', solveCaptcha, verifyController);

export = router;
