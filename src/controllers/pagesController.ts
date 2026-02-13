import { Request, Response, NextFunction, request } from 'express';
import Customer from '../models/customer';
import customerRepository from '../repositories/customerRepository';

// index page
//app.get('/', function (req, res) {
//  res.render('pages/index');
//});
//
//// form page
//app.get('/form', function (req, res) {
//  res.render('pages/form', {titulo:'Formulário'});
//});
//
//// submit page
//app.post('/submit', function (req, res) {
//  res.render('pages/list', {titulo:'Cadastrados'});  
//});
//
//// list page
//app.get('/list', function (req, res) {
//  res.render('pages/list', {titulo:'Cadastrados'});
//});
//
//// about page
//app.get('/about', function (req, res) {
//  res.render('pages/about');
//});

async function homePage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/index');
}

async function formPage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/form', { titulo: 'Form' });
}

async function listPage(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.getCustomers();
    console.log(customers);
    res.render('pages/list', { titulo: 'List', items: customers });
}

async function submitPage(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const result = await customerRepository.addCustomer(customer);
    res.render('pages/submit', { name: result.name });
}

async function aboutPage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/about');
}

export default { homePage, formPage, submitPage, listPage, aboutPage }