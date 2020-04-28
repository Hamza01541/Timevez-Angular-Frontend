export class User {
    _id: string;
    username: string;
    password: string;
    oldPassword:string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    CNIC: string;
    roles: [];
    active: boolean = true;
}