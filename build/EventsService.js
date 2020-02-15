"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const employee_1 = require("./employee");
class EventsService {
    constructor() {
        this.events = [
            new event_1.Event("92b19fc6-5386-4985-bf5c-dc56c903dd23", "Itaque fugiat repellendus velit deserunt praesentium.", new Date("2019-09-22T23:07:01"), 2291, "UZS", new employee_1.Employee("858142ac-299a-48f0-b221-7d6de9439454", "Birthe", "Meier"), ""),
            new event_1.Event("92b19fc6-5386-4985-bf5c-dc56c903dd24", "hihi ehehe.", new Date("2019-09-23T23:07:01"), 22, "UZS", new employee_1.Employee("858142ac-299a-48f0-b221-7d6de9439455", "Alia", "Hazem"), "")
        ];
    }
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
    configResolvers(resolvers) {
        resolvers.Query.event = (_, inputData) => {
            return this.events.find(event => event.uuid == inputData.uuid);
        };
        // resolvers.Query.events = () => {
        //     return this.events;
        // };
        resolvers.Query.events = (_, inputData, context, info) => __awaiter(this, void 0, void 0, function* () {
            const where = inputData.filter ? {
                OR: [
                    { description_contains: inputData.filter },
                ],
            } : {};
            const events = yield context.prisma.events({
                where
                ///skip: inputData.skip,
                ///first: inputData.first,
                ///orderBy: inputData.orderBy
            });
            return events;
        });
        resolvers.Mutation.event = (_, inputData) => {
            let event = this.events.find(event => event.uuid == inputData.uuid);
            event.status = inputData.status;
            return event;
        };
    }
}
exports.EventsService = EventsService;
