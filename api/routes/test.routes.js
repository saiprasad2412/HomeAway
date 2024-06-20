import express from 'express';
import { shouldBeAdmin, shouldBeLoggedin } from '../controllers/test.controllers.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const router= express.Router();

router.get('/loggedin',verifyToken, shouldBeLoggedin);
router.get('/admin',shouldBeAdmin);

export default router