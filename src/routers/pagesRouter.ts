import express from "express";
import pagesController from '../controllers/pagesController';

const router = express.Router();

//router.get('/:id', customerController.getCustomer);
router.get('/', pagesController.homePage);
router.get('/form', pagesController.formPage);
router.post('/submit', pagesController.submitPage)
router.get('/list', pagesController.listPage);
router.get('/about', pagesController.aboutPage);

//router.post('/', pagesController.postCustomer);
//router.put('/:id', customerController.patchCustomer);
//router.patch('/:id', customerController.patchCustomer);
//router.delete('/:id', customerController.deleteCustomer);

export default router;