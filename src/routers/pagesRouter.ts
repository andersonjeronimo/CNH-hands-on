import express from "express";
import pagesController from '../controllers/pagesController';

const router = express.Router();

//router.get('/:id', customerController.getCustomer);
router.get('/', pagesController.homePage);
router.get('/pre_cadastro', pagesController.preRegisterPage);
router.get('/cadastro', pagesController.registerPage);
router.get('/pre_busca', pagesController.preSearchPage);
router.get('/busca', pagesController.searchPage);
router.get('/instrutores', pagesController.customersPage);
router.post('/filtro_instrutores', pagesController.filterCustomersPage);
router.post('/submit', pagesController.submitPage)
router.get('/about', pagesController.aboutPage);

//router.post('/', pagesController.postCustomer);
//router.put('/:id', customerController.patchCustomer);
//router.patch('/:id', customerController.patchCustomer);
//router.delete('/:id', customerController.deleteCustomer);

export default router;