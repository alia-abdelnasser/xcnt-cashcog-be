import { getCustomRepository } from "typeorm";
import { EventRepository } from "../repositories/event.repository";

export class EventsResolver {
    configResolvers(resolvers: any) {
        resolvers.Query.event = async (_: any, inputData: any) => {
            return await getCustomRepository(EventRepository)
                .findOne(inputData.uuid);
        };

        resolvers.Query.events = async (_: any, inputData: any) => {
            const criteria = inputData ? {
                where: inputData.status ? {
                    status: inputData.status
                } : {},
                order: inputData.orderDir ? {
                    created_at: inputData.orderDir.toUpperCase()
                } : {},
                skip: inputData.startIndex ? inputData.startIndex : 0,
                take: inputData.pageSize ? inputData.pageSize : 10
            } : {};

            return await getCustomRepository(EventRepository)
                .find(criteria);
        };

        resolvers.Mutation.updateEvent = async (_: any, inputData: any) => {
            await getCustomRepository(EventRepository)
                .update({ uuid: inputData.uuid }, { status: inputData.status });

            return await getCustomRepository(EventRepository)
                .findOne(inputData.uuid);
        };
    }
}