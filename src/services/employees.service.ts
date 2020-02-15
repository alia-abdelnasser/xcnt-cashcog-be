import { empolyeesMock } from "../mocks/empolyees.mock";

export class EmployeesService {

    public employees = empolyeesMock;

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