export const EmployeeTypeDef =
    `
    type Employee {
        uuid: String,
        first_name: String,
        last_name: String
    }

    extend type Query {
        employee(uuid: String): Employee
    }
    `;
