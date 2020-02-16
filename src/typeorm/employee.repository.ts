import {
    EntityRepository,
    Repository,
    EntityManager
} from "typeorm";

import { Employee } from "../models/employee";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    createAndSave(employee: Employee) {
        return this.manager.save(employee);
    }

}