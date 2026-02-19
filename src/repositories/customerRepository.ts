//import dotenv from 'dotenv';
//dotenv.config();

import Customer from '../models/customer';
import { MongoClient } from "mongodb";

//Webhook Mercado Pago
import { Status } from "../public/utils/utils";

//https://www.mongodb.com/pt-br/docs/drivers/node/current/crud/insert/

const uri = "mongodb://127.0.0.1";
const dbName = "cnh";
const collectionName = "customers";

async function findCustomer(query: {}) {
    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        document = await collection.findOne(query);
    } finally {
        await client.close();
    }
    return document;
}

async function findCustomers(query: {}) {
    let documents;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        documents = await collection.find(query).toArray();
    } finally {
        await client.close();
    }
    return documents;
}

async function insertCustomer(doc: Customer) {
    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const customers = database.collection(collectionName);
        document = await customers.insertOne(doc);
    } finally {
        await client.close();
    }
    return document.insertedId;
}

//Webhook Mercado Pago
async function updateCustomerStatus(cpf: string, event: string) {
    /* Eventos:
    ✅ subscription_created
    ✅ payment_succeeded
    ✅ payment_failed
    ✅ subscription_cancelled */
    let new_status;
    switch (event) {
        case "payment_succeeded":
            new_status = Status.Ativo;
            break;

        case "payment_failed":
            new_status = Status.Pausado;
            break;

        case "subscription_cancelled":
            new_status = Status.Inativo;
            break;

        default:
            break;
    }

    let document;
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        document = await collection.updateOne(
            { cpf: cpf },
            {
                $set: {
                    status: new_status,
                },
            },
            /* Set the upsert option to insert a document if no documents
            match the filter */
            { upsert: true }
        );
        // Print the number of matching and modified documents
        console.log(
            `${document.matchedCount} document(s) matched the filter, updated ${document.modifiedCount} document(s)`
        );
    } finally {
        // Close the connection after the operation completes
        await client.close();
    }

}

export default {
    findCustomer,
    findCustomers,
    insertCustomer,
    updateCustomerStatus
}