import { configEmployeesResolvers } from './employees.resolver';
import { configEventsResolvers } from './events.resolver';

export const getResolvers = () => {
    let xcnt: string = 'XCNT!';

    let resolvers = {
        Query: {
            xcnt: () => xcnt
        },
        Mutation: {
            xcnt: (_: any, data: any) => {
                return `${xcnt} welcomes ${data.name}`;
            }
        }
    };

    configEmployeesResolvers(resolvers);
    configEventsResolvers(resolvers);

    return resolvers;
}