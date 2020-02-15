import { Event } from "../models/event";
import { eventsMock } from "../mocks/events.mock";

export class EventsService {

    public events = eventsMock;

    configTypeDefs() {
        let typeDefs = `
        scalar Date

        type Event {
            uuid: String
            description: String
            amount: Int
            currency: String
            status: String
            created_at: Date
            employee: Employee
        } 

        extend type Query {
            event(uuid: String!): Event
            events: [Event!]
        }
        
        extend type Mutation {
            updateEvent(uuid: String!, status: String!): Event!
        }`;
        return typeDefs;
    }

    configResolvers(resolvers: any) {
        resolvers.Query.event = (_: any, inputData: any) => {
            return this.events.find(event => event.uuid == inputData.uuid)!;
        };

        resolvers.Query.events = () => {
            return this.events;
        };

        // resolvers.Query.events = async (_: any, inputData: any, context: any, info: any) => {
        //     const where = inputData.filter ? {
        //         OR: [
        //             { description_contains: inputData.filter },
        //         ],
        //     } : {}

        //     const events = await context.prisma.events({
        //         where
        //         ///skip: inputData.skip,
        //         ///first: inputData.first,
        //         ///orderBy: inputData.orderBy
        //     })
        //     return events
        // }
        //            events(filter: String, skip: Int, first: Int, orderBy: String): [Event!]!

        resolvers.Mutation.updateEvent = (_: any, inputData: any) => {
            let event: Event = this.events.find(event => event.uuid == inputData.uuid)!;
            event.status = inputData.status;
            return event;
        };
    }
}