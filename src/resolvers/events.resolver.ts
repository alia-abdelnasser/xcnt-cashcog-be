import { Event } from "../models/event";
import { eventsMock } from "../mocks/events.mock";
import { Employee } from "../models/employee";
import { getCustomRepository } from "typeorm";
import { EventRepository } from "../repositories/event.repository";

export class EventsResolver {

    public events = eventsMock;

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

        resolvers.Mutation.createEvent = async (_: any, inputData: any) => {
            let event = new Event(inputData.uuid, inputData.description, inputData.created_at, inputData.amount, inputData.currency, new Employee("d", "", ""), "PENDING");
            return await getCustomRepository(EventRepository).createAndSave(event);
        }
    }
}