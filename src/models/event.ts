import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee';

@Entity('events')
export class Event {
    @PrimaryColumn('varchar', { length: 60 })
    uuid: string;

    @Column('varchar', { length: 1000 })
    description: string;

    @Column('datetime')
    created_at: Date;

    @Column('int')
    amount: number;

    @Column('varchar', { length: 45 })
    currency: string;

    @ManyToOne(type => Employee)
    @JoinColumn()
    employee!: Employee;

    @Column('varchar', { length: 45 })
    status: EventStatus;

    constructor(uuid: string,
        description: string,
        created_at: Date,
        amount: number,
        currency: string,
        employee: Employee,
        status: EventStatus) {
        this.uuid = uuid;
        this.description = description;
        this.created_at = created_at;
        this.amount = amount;
        this.currency = currency;
        this.employee = employee;
        this.status = status;
    }
}