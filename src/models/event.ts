import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./employee";

@Entity('events')
export class Event {
    @PrimaryColumn('varchar', { length: 60 })
    uuid: String;

    @Column('varchar', { length: 1000 })
    description: String;

    @Column('date')
    created_at: Date;

    @Column('int')
    amount: Number;

    @Column('varchar', { length: 45 })
    currency: String;

    @ManyToOne(type => Employee)
    @JoinColumn()
    employee: Employee;

    @Column('varchar', { length: 45 })
    status: String;

    constructor(uuid: String, description: String, created_at: Date,
        amount: Number, currency: String, employee: Employee,
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