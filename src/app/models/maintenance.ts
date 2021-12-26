export class Maintenance{
    _id?: string;
    name: String;
    lastname: String;
    idnumber: String;
    address: String;
    email: String;
    constructor(
        name: String,
        lastname: String,
        idnumber: String,
        address: String,
        email: String,){
            this.name = name;
            this.lastname = lastname;
            this.idnumber = idnumber;
            this.address = address;
            this.email = email;}
}