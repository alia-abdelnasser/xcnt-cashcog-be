import { Employee } from "./employee";

export class EmployeesService {

    public employees: Employee[] = [
        new Employee("858142ac-299a-48f0-b221-7d6de9439454",
            "Birthe",
            "Meier")
    ];

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

    configResolvers(resolvers: any) {
        resolvers.Query.employee = (_: any, inputData: any) => {
            return this.employees.find(employee => employee.uuid == inputData.uuid)!;
        };

        resolvers.Query.employees = () => {
            return this.employees;
        };
    }
}