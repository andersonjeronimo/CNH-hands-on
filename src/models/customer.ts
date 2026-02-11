import Status from "../utils/utils";
export default class Customer {
    id: string;
    name: string;
    cpf: string;
    status: string;
    phone:string;
    constructor(id: string, name: string, cpf: string, phone:string, status:string) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.status = status;
    }
}