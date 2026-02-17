import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import Customer from '../models/customer';
import customerRepository from '../repositories/customerRepository';
import { Status, Vehicle, Category } from "../public/utils/utils";
import axios from 'axios';

import fs from 'fs';
import path from 'path';
const FILE_PATH = path.join(__dirname, '../public/utils/estados.json');

async function homePage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/index');
}

async function preRegisterPage(req: Request, res: Response, next: NextFunction) {
    if (fs.existsSync(FILE_PATH)) {
        const states = fs.readFileSync(FILE_PATH, 'utf8');
        res.render('pages/pre_cadastro', { titulo: 'Lista de Estados', uf: JSON.parse(states) });
    } else {
        res.render('pages/pre_cadastro', { titulo: 'Lista de Estados', uf: [], ddd: [] });
    }
}

async function registerPage(req: Request, res: Response, next: NextFunction) {
    const state_id = req.query.state;
    const url = `${process.env.IBGE_ESTADOS}${state_id}/municipios?orderBy=nome`;
    let data = fs.readFileSync(FILE_PATH, 'utf8');
    const states: any[] = JSON.parse(data);
    const state = states.find(item => String(item.id) === state_id);
    try {
        const response = await axios.get(url);
        res.render('pages/cadastro', { state: state, cities: response.data, status: Status, vehicle: Vehicle, category: Category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from IBGE API');
    }
}

async function preSearchPage(req: Request, res: Response, next: NextFunction) {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        res.render('pages/pre_busca', { titulo: 'Lista de Estados', uf: JSON.parse(data) });
    } else {
        res.render('pages/pre_busca', { titulo: 'Lista de Estados', uf: [] });
    }
}

async function searchPage(req: Request, res: Response, next: NextFunction) {
    const state = req.query.state;
    const url = `${process.env.IBGE_ESTADOS}${state}/municipios?orderBy=nome`;
    try {
        const response = await axios.get(url);
        res.render('pages/busca', { cities: response.data, status: Status, vehicle: Vehicle, category: Category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from IBGE API');
    }

}

async function customersPage(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.findCustomers({})
    res.render('pages/instrutores', { titulo: 'Lista de Instrutores Cadastrados', items: customers });
}

async function filterCustomersPage(req: Request, res: Response, next: NextFunction) {
    const filter = {
        category: req.body.category,
        vehicle: req.body.vehicle,
        city: req.body.city
    }

    const customers = await customerRepository.findCustomers(filter)
    res.render('pages/filtro_instrutores', { titulo: 'Lista de Instrutores por Critério de Busca', items: customers });
}

async function submitPage(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const id = await customerRepository.insertCustomer(customer);
    res.render('pages/submit', { customer: customer, result: id });
}

async function aboutPage(req: Request, res: Response, next: NextFunction) {
    res.render('pages/about');
}

export default { homePage, preRegisterPage, registerPage, preSearchPage, searchPage, submitPage, customersPage, filterCustomersPage, aboutPage }