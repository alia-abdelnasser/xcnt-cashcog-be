import { EmployeeTypeDef } from "./employee.typeDef";
import { EventTypeDef } from "./event.typeDef";

export const getTypeDefs = () => {
    return [`
            type Query { 
                xcnt: String 
            }
   
            type Mutation { 
                xcnt(name: String) : String
             }
        `]
        + EmployeeTypeDef
        + EventTypeDef;
}