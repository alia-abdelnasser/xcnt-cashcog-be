import { getCustomRepository } from 'typeorm';
import { EmployeeRepository } from '../repositories/employee.repository';

export const configEmployeesResolvers = (resolvers: any) => {
    resolvers.Query.employee = async (_: any, inputData: any) => {
        return await getCustomRepository(EmployeeRepository)
            .findOne(inputData.uuid);
    };
}