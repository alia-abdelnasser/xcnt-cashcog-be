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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_tools_1 = require("graphql-tools");
const typeorm_1 = require("typeorm");
const employee_1 = require("./models/employee");
const typeDefs_1 = require("./typeDefs/typeDefs");
const resolvers_1 = require("./resolvers/resolvers");
const event_1 = require("./models/event");
const app = express_1.default();
const port = 3000;
//DATABASE
typeorm_1.createConnection({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'xcnt',
    entities: [employee_1.Employee, event_1.Event],
    synchronize: true
})
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () { console.log("Connected To DB"); }))
    .catch(error => console.log("TypeORM connection error: ", error));
// GRAPH_QL
let resolvers = resolvers_1.getResolvers();
let typeDefs = typeDefs_1.getTypeDefs();
app.use('/graphql', express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`XCNT Graphql API listening on port ${port}!`));
