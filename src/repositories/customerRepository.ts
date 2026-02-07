import Customer from '../models/customer';

const customers: Customer[] = [];

async function getCustomer(id: number): Promise<Customer | undefined> {
    return new Promise((resolve, reject) => {
        return resolve(customers.find(c => c.id === id));
    })
}

async function getCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
        return resolve(customers);
    })
}

async function addCustomer(customer: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
        if (!customer.name || !customer.cpf) {
            return reject(new Error(`Invalid customer.`));
        }
        const newCustomer = new Customer(customer.name, customer.cpf);
        customers.push(newCustomer);

        return resolve(newCustomer);
    })
}

async function updateCustomer(id: number, customerData: Customer): Promise<Customer | undefined> {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);

        if (index === -1) {
            return reject(new Error(`Customer not found.`));
        }

        if (customerData.name && customers[index].name !== customerData.name) {
            customers[index].name = customerData.name;
        }

        if (customerData.cpf && customers[index].cpf !== customerData.cpf) {
            customers[index].cpf = customerData.cpf;
        }        

        return resolve(customers[index]);
    })
}

async function deleteCustomer(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index === -1) {
            return resolve(false);
        }
        customers.splice(index, 1);
        return resolve(true);
    })
}

export default {
    getCustomer,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}