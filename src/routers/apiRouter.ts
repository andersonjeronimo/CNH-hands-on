import express from "express";
import apiController from '../controllers/apiController';

const router = express.Router();

router.get('/:id', apiController.getCustomer);
router.get('/', apiController.getCustomers);
router.post('/', apiController.postCustomer);
router.put('/:id', apiController.patchCustomer);
router.patch('/:id', apiController.patchCustomer);
router.delete('/:id', apiController.deleteCustomer);

/*Webhooks*/
router.post('/webhook/:event', apiController.handleCustomerStatus);

export default router;