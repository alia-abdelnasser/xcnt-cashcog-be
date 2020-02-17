import { EmployeesResolver } from "./employees.resolver";
import { EventsResolver } from "./events.resolver";

export const getResolvers = () => {
    let xcnt: String = 'XCNT!';

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

    new EmployeesResolver().configResolvers(resolvers);
    new EventsResolver().configResolvers(resolvers);

    return resolvers;
}