import { empolyeesMock } from "../mocks/empolyees.mock";
import { getCustomRepository } from "typeorm";
import { EmployeeRepository } from "../repositories/employee.repository";
import { Employee } from "../models/employee";

export class EmployeesResolver {

    public employees = empolyeesMock;

    configResolvers(resolvers: any) {
        resolvers.Query.employee = (_: any, inputData: any) => {
            return this.employees.find(employee => employee.uuid == inputData.uuid)!;
        };

        resolvers.Query.employees = () => {
            return this.employees;
        };

        resolvers.Mutation.createEmp = async (_: any, inputData: any) => {
            let employee = new Employee(inputData.uuid, inputData.first_name, inputData.last_name);
            return await getCustomRepository(EmployeeRepository).createAndSave(employee);
        }
    }
}