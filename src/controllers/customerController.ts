import { Request, Response, NextFunction, request } from 'express';
import Customer from '../models/customer';
import customerRepository from '../repositories/customerRepository';

async function getCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const customer = await customerRepository.getCustomer(parseInt(id));

    if (customer) {
        res.json(customer);
    } else {
        res.sendStatus(404);
    }
}

async function getCustomers(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.getCustomers();
    res.json(customers);
}

async function postCustomer(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const result = await customerRepository.addCustomer(customer);
    res.status(201).json(result);
}

async function patchCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const customerData = req.body as Customer;
    const result = await customerRepository.updateCustomer(parseInt(id), customerData);
    res.json(result);
}

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const result = await customerRepository.deleteCustomer(parseInt(id));
    if (result) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

export default { getCustomer, getCustomers, postCustomer, patchCustomer, deleteCustomer }