export class signUp {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    CNIC: string;
    roles: [];
    active: boolean = true;
}
export enum rolesType {     
    admin="Admin",
    employee="employee"
}