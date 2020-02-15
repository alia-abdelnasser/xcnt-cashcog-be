"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("./employee");
class EmployeesService {
    constructor() {
        this.employees = [
            new employee_1.Employee("858142ac-299a-48f0-b221-7d6de9439454", "Birthe", "Meier")
        ];
    }
    configTypeDefs() {
        let typeDefs = `
        type Employee {
            uuid: String,
            first_name: String,
            last_name: String
        } 

        extend type Query {
            employee(uuid: String): Employee!
            employees: [Employee]
        }
        `;
        return typeDefs;
    }
    configResolvers(resolvers) {
        resolvers.Query.employee = (_, inputData) => {
            return this.employees.find(employee => employee.uuid == inputData.uuid);
        };
        resolvers.Query.employees = () => {
            return this.employees;
        };
    }
}
exports.EmployeesService = EmployeesService;
