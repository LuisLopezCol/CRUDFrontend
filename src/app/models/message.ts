export class Message{
    _id?: string;
    name: String;
    message: String;
    constructor(
        name: String,
        message: String,){
            this.name = name;
            this.message = message;}
}