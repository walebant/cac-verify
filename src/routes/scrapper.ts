import express from 'express';
import controller from '../controllers/scrapper';

const router = express.Router();

router.get('/scrap', controller.scrapper);

export = router;
