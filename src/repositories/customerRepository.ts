import Customer from '../models/customer';
import fs from 'fs';
import path from 'path';
const FILE_PATH = path.join(__dirname, 'customers.json');
import * as crypto from 'crypto';
import {Status} from "../utils/utils";
import {Vehicle} from "../utils/utils";
import {Category} from "../utils/utils";

function generateUuid(): string {
    return crypto.randomUUID();
}

async function getCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            return resolve(JSON.parse(data));
        } else {
            return resolve([]);
        }
    })
}

async function getCustomer(id: string): Promise<Customer | undefined> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        return resolve(customers.find(c => c.id === id));
    })
}

async function addCustomer(customer: Customer): Promise<Customer> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        if (!customer.name || !customer.cpf) {
            return reject(new Error(`Invalid customer.`));
        }
        const userId = generateUuid();
        const newCustomer = new Customer(userId, customer.name, customer.email, customer.phone, customer.cpf, Status.Pausado, Category.A, Vehicle.Proprio, customer.state, customer.city);
        customers.push(newCustomer);
        fs.writeFileSync(FILE_PATH, JSON.stringify(customers));
        return resolve(newCustomer);
    })
}

async function putCustomer(id: string, customerData: Customer): Promise<Customer | undefined> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index === -1) {
            return reject(new Error(`Customer not found.`));
        }

        customerData.id = customers[index].id;
        customers[index] = customerData;
        fs.writeFileSync(FILE_PATH, JSON.stringify(customers));
        return resolve(customers[index]);
    })
}

async function patchCustomer(id: string, customerData: Customer): Promise<Customer | undefined> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index === -1) {
            return reject(new Error(`Customer not found.`));
        }
        customerData.id = customers[index].id;
        let key: keyof Customer;
        for (key in customers[index]) {
            if (customerData[key]) {
                customers[index][key] = customerData[key];
            }
        }
        fs.writeFileSync(FILE_PATH, JSON.stringify(customers));
        return resolve(customers[index]);
    })
}

async function patchCustomerStatus(cpf: string, event: string): Promise<Customer | undefined> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.cpf === cpf);
        if (index === -1) {
            return reject(new Error(`Customer not found.`));
        }
        switch (event) {
            case "payment_succeeded":
                customers[index].status = Status.Ativo;
                break;

            case "payment_failed":
                customers[index].status = Status.Pausado;
                break;

            case "subscription_cancelled":
                customers[index].status = Status.Inativo;
                break;

            default:
                break;
        }
        fs.writeFileSync(FILE_PATH, JSON.stringify(customers));
        return resolve(customers[index]);

        /*
        Eventos:
            ✅ subscription_created
            ✅ payment_succeeded
            ✅ payment_failed
            ✅ subscription_cancelled
        */

    })
}

async function deleteCustomer(id: string): Promise<boolean> {
    const customers = await getCustomers();
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index === -1) {
            return resolve(false);
        }
        customers.splice(index, 1);
        fs.writeFileSync(FILE_PATH, JSON.stringify(customers));
        return resolve(true);
    })
}

export default {
    getCustomer,
    getCustomers,
    addCustomer,
    putCustomer,
    patchCustomer,
    patchCustomerStatus,
    deleteCustomer
}