
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('employees')
export class Employee {
    @PrimaryColumn('varchar', { length: 60 })
    uuid: String;

    @Column('varchar', { length: 200 })
    first_name: String;
    
    @Column('varchar', { length: 200 })
    last_name: String;

    constructor(uuid: String,
        first_name: String,
        last_name: String) {
        this.uuid = uuid;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}