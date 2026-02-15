import { Request, Response, NextFunction } from 'express';
import Customer from '../models/customer';
import { Status } from "../utils/utils";
import { Vehicle } from "../utils/utils";
import { Category } from "../utils/utils";
import customerRepository from '../repositories/customerRepository';
import axios from 'axios';

import fs from 'fs';
import path from 'path';
const FILE_PATH = path.join(__dirname, '../utils/estados.json');

async function homePage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/index');
}

async function formPage1(req: Request, res: Response, next: NextFunction) {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        res.render('pages/form1', { titulo: 'Form1', uf: JSON.parse(data) });
    } else {
        res.render('pages/form1', { titulo: 'Form1', uf: [] });
    }
}

async function formPage2(req: Request, res: Response, next: NextFunction) {
    const state = req.query.state;
    try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`);
        res.render('pages/form2', { cities: response.data, status: Status, vehicle: Vehicle, category: Category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from IBGE API');
    }

}

async function listPage(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.getCustomers();
    console.log(customers);
    res.render('pages/list', { titulo: 'List', items: customers });
}

async function submitPage(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    //const result = await customerRepository.addCustomer(customer);
    const result = await customerRepository.insertCustomer(customer);
    res.render('pages/submit', { name: customer.name, result: result });
}

async function aboutPage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/about');
}

export default { homePage, formPage1, formPage2, submitPage, listPage, aboutPage }