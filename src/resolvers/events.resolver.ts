import { getCustomRepository } from 'typeorm';
import { EventRepository } from '../repositories/event.repository';

export const configEventsResolvers = (resolvers: any) => {
    resolvers.Query.event = async (_: any, inputData: any) => {
        return await getCustomRepository(EventRepository)
            .findOne(inputData.uuid);
    };

    resolvers.Query.events = async (_: any, inputData: any) => {
        const criteria: { [k: string]: any } = {};

        criteria.where = inputData.status ? {
            status: inputData.status
        } : {};

        criteria.skip = inputData.startIndex ? inputData.startIndex : 0;
        criteria.take = inputData.pageSize ? inputData.pageSize : 10;

        criteria.order = { created_at: 'ASC' };
        if (inputData.orderBy) {
            let orderBy: { [k: string]: any } = {};
            orderBy[inputData.orderBy] = inputData.orderDir ? inputData.orderDir.toUpperCase() : 'ASC';
            criteria.order = orderBy;
        }

        return await getCustomRepository(EventRepository)
            .find(criteria);
    };

    resolvers.Mutation.updateEvent = async (_: any, inputData: any) => {
        let validStatuses = ['PENDING', 'APPROVED', 'DECLINED'];
        if (!validStatuses.includes(inputData.status)) {
            throw new Error('Status is not valid');
        }

        let event = await getCustomRepository(EventRepository)
            .findOne(inputData.uuid);

        if (!event) {
            throw new Error('Event is not found');
        }

        await getCustomRepository(EventRepository)
            .update({ uuid: inputData.uuid }, { status: inputData.status });

        return await getCustomRepository(EventRepository)
            .findOne(inputData.uuid);
    };
}