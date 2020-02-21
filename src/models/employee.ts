
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('employees')
export class Employee {
    @PrimaryColumn('varchar', { length: 60 })
    uuid: string;

    @Column('varchar', { length: 200 })
    first_name: string;

    @Column('varchar', { length: 200 })
    last_name: string;

    constructor(uuid: string,
        first_name: string,
        last_name: string) {
        this.uuid = uuid;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}