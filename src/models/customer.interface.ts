import { ObjectId } from 'mongodb';
export default interface ICustomer {
    _id: ObjectId;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: string;
    category: string;
    vehicle: string;
    state: string;
    city: string;
}