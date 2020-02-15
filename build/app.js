"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_tools_1 = require("graphql-tools");
const EventsService_1 = require("./EventsService");
const EmployeesService_1 = require("./EmployeesService");
const app = express_1.default();
const port = 3000;
let typeDefs = [`
  type Query {
    xcnt: String
  }
     
  type Mutation {
    xcnt(message: String) : String
  }
`];
let xcnt = 'Hello XCNT!';
let resolvers = {
    Query: {
        xcnt: () => xcnt
    },
    Mutation: {
        xcnt: (_, data) => {
            return data.message;
        }
    }
};
let employeesService = new EmployeesService_1.EmployeesService();
typeDefs += employeesService.configTypeDefs();
employeesService.configResolvers(resolvers);
let eventsService = new EventsService_1.EventsService();
typeDefs += eventsService.configTypeDefs();
eventsService.configResolvers(resolvers);
app.use('/graphql', express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`XCNT Graphql API listening on port ${port}!`));
