import Customer from '../models/customer';
import ICustomer from '../models/customer.interface';
import * as crypto from 'crypto';
import { Status } from "../utils/utils";
import { Vehicle } from "../utils/utils";
import { Category } from "../utils/utils";

import fs from 'fs';
import path from 'path';
const FILE_PATH = path.join(__dirname, 'customers.json');

import { MongoClient } from "mongodb";

//https://www.mongodb.com/pt-br/docs/drivers/node/current/crud/insert/

//const uri = 'mongodb://127.0.0.1';
//const dbName = 'cnh';
//const collectionName = 'customers';

async function findCustomer(query: {}) {
    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        document = await collection.findOne<ICustomer>(query);        
    } finally {
        await client.close();
    }
    return document?._id;
}

const uri = 'mongodb://127.0.0.1';
const dbName = 'cnh';
const collectionName = 'customers';

async function findCustomers() {
    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        document = await collection.find().toArray();
    } finally {
        await client.close();
    }
    return document;
}

async function insertCustomer(doc: Customer) {
    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const customers = database.collection(collectionName);
        doc.status = Status.Pausado;
        document = await customers.insertOne(doc);
        console.log(`A document was inserted with the _id: ${document.insertedId}`);
    } finally {
        await client.close();
    }
    return document.insertedId;
}


function generateUuid(): string {
    return crypto.randomUUID();
}

/* async function getCustomer(id: string): Promise<Customer | undefined> {
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
        const newCustomer = new Customer(customer.name, customer.email, customer.phone, customer.cpf, Status.Pausado, Category.A, Vehicle.Proprio, customer.state, customer.city);
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

        
        //Eventos:
        //    ✅ subscription_created
        //    ✅ payment_succeeded
        //    ✅ payment_failed
        //    ✅ subscription_cancelled
        

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
} */

export default {
    findCustomer,
    findCustomers,
    insertCustomer,
    //getCustomer,    
    //addCustomer,
    //putCustomer,
    //patchCustomer,
    //patchCustomerStatus,
    //deleteCustomer
}