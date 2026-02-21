import express from "express";
import apiController from '../controllers/apiController';

const router = express.Router();
/*Webhooks*/
router.post('/webhook/:event', apiController.handleCustomerStatus);

export default router;