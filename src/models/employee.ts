export class Employee {
    uuid: String;
    first_name: String;
    last_name: String;

    constructor(uuid: String,
        first_name: String,
        last_name: String) {
        this.uuid = uuid;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}