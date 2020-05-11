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
    photo: string | ArrayBuffer;
    roles: [];
    active: boolean = true;
}