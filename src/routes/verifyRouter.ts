import express from 'express';
import controller from '../controllers/verify';
import solveCaptcha from '../middlewares/solveCaptcha';

const router = express.Router();

router.get('/:rcNumber', solveCaptcha, controller.verify);

export = router;
