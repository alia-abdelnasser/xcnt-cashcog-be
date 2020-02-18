import { EntityRepository, Repository } from 'typeorm';
import { Employee } from '../models/employee';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> { }