export default class Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: string;
    category: string;
    vehicle: string;
    state: string;
    city: string;

    constructor(id: string, name: string, email: string, phone: string, cpf: string, status: string, category: string, vehicle: string, state: string, city: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.cpf = cpf;        
        this.status = status;
        this.category = category;
        this.vehicle = vehicle;
        this.state = state;
        this.city = city;
    }
}

/*
Nome
E-mail
Celular
Estado 
Município
Categoria (A, B, A/B)
Veículo próprio e/ou do aluno 
Valor hora/aula
 */