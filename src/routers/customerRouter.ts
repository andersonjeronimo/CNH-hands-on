import express from "express";
import customerController from '../controllers/customerController';

const router = express.Router();

router.get('/:id', customerController.getCustomer);
router.get('/', customerController.getCustomers);
router.post('/', customerController.postCustomer);
router.put('/:id', customerController.patchCustomer);
router.patch('/:id', customerController.patchCustomer);
router.delete('/:id', customerController.deleteCustomer);

/*Webhooks*/
//router.post('/subscription_created', customerController.postCustomer);
router.post('/webhook/:event', customerController.handleCustomerStatus);

export default router;