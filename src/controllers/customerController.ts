import { Request, Response, NextFunction, request } from 'express';
import Customer from '../models/customer';
import customerRepository from '../repositories/customerRepository';

async function getCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const customer = await customerRepository.getCustomer(id);

    if (customer) {
        res.status(200).json(customer);
    } else {
        res.sendStatus(404);
    }
}

async function getCustomers(req: Request, res: Response, next: NextFunction) {
    const customers = await customerRepository.getCustomers();
    res.status(200).json(customers);
}

async function postCustomer(req: Request, res: Response, next: NextFunction) {
    const customer = req.body as Customer;
    const result = await customerRepository.addCustomer(customer);
    res.status(201).json(result);
}

async function putCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const customerData = req.body as Customer;
    const result = await customerRepository.putCustomer(id, customerData);
    res.status(201).json(result);
}

async function patchCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const customerData = req.body as Customer;
    const result = await customerRepository.patchCustomer(id, customerData);
    res.status(200).json(result);
}

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const id = Array.isArray(req.params.id) ? req.params.is[0] : req.params.id;
    const result = await customerRepository.deleteCustomer(id);
    if (result) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

export default { getCustomer, getCustomers, postCustomer, putCustomer, patchCustomer, deleteCustomer }