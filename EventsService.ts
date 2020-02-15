import { Event } from "./event";
import { Employee } from "./employee";

export class EventsService {

    public events: Event[] = [
        new Event("92b19fc6-5386-4985-bf5c-dc56c903dd23",
            "Itaque fugiat repellendus velit deserunt praesentium.",
            new Date("2019-09-22T23:07:01"),
            2291,
            "UZS",
            new Employee("858142ac-299a-48f0-b221-7d6de9439454",
                "Birthe",
                "Meier"),
            ""),

        new Event("92b19fc6-5386-4985-bf5c-dc56c903dd24",
            "hihi ehehe.",
            new Date("2019-09-23T23:07:01"),
            22,
            "UZS",
            new Employee("858142ac-299a-48f0-b221-7d6de9439455",
                "Alia",
                "Hazem"),
            "")
    ];

    configTypeDefs() {
        let typeDefs = `
        scalar Date

        type Event {
            uuid: String,
            description: String,
            amount: Int,
            currency: String,
            status: String,
            created_at: Date,
            employee: Employee
        } 

        extend type Query {
            event(uuid: String): Event!
            events(filter: String, skip: Int, first: Int, orderBy: String): [Event!]!
        }
        
        extend type Mutation {
            event(uuid: String, status: String): Event!
        }`;
        return typeDefs;
    }

    configResolvers(resolvers: any) {
        resolvers.Query.event = (_: any, inputData: any) => {
            return this.events.find(event => event.uuid == inputData.uuid)!;
        };

        // resolvers.Query.events = () => {
        //     return this.events;
        // };

        resolvers.Query.events = async (_: any, inputData: any, context: any, info: any) => {
            const where = inputData.filter ? {
                OR: [
                    { description_contains: inputData.filter },
                ],
            } : {}

            const events = await context.prisma.events({
                where
                ///skip: inputData.skip,
                ///first: inputData.first,
                ///orderBy: inputData.orderBy
            })
            return events
        }

        resolvers.Mutation.event = (_: any, inputData: any) => {
            let event: Event = this.events.find(event => event.uuid == inputData.uuid)!;
            event.status = inputData.status;
            return event;
        };
    }
}