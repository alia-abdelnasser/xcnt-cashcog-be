"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(uuid, description, created_at, amount, currency, employee, status) {
        this.uuid = uuid;
        this.description = description;
        this.created_at = created_at;
        this.amount = amount;
        this.currency = currency;
        this.employee = employee;
        this.status = status;
    }
}
exports.Event = Event;
