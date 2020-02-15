import { Employee } from "./employee";

export class Event {
    uuid: String;
    description: String;
    created_at: Date;
    amount: Number;
    currency: String;
    employee: Employee;
    status: String;

    constructor(uuid: String,
        description: String,
        created_at: Date,
        amount: Number,
        currency: String,
        employee: Employee,
        status: String) {
        this.uuid = uuid;
        this.description = description;
        this.created_at = created_at;
        this.amount = amount;
        this.currency = currency;
        this.employee = employee;
        this.status = status;
    }
}