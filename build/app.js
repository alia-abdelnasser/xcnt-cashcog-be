"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_tools_1 = require("graphql-tools");
const events_service_1 = require("./services/events.service");
const employees_service_1 = require("./services/employees.service");
const app = express_1.default();
const port = 3000;
let typeDefs = [`
  type Query {
    xcnt: String
  }
     
  type Mutation {
    xcnt(name: String) : String
  }
`];
let xcnt = 'XCNT!';
let resolvers = {
    Query: {
        xcnt: () => xcnt
    },
    Mutation: {
        xcnt: (_, data) => {
            return `${xcnt} welcomes ${data.name}`;
        }
    }
};
let employeesService = new employees_service_1.EmployeesService();
typeDefs += employeesService.configTypeDefs();
employeesService.configResolvers(resolvers);
let eventsService = new events_service_1.EventsService();
typeDefs += eventsService.configTypeDefs();
eventsService.configResolvers(resolvers);
app.use('/graphql', express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`XCNT Graphql API listening on port ${port}!`));
