import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { createConnection } from 'typeorm'
import { Employee } from './models/employee';
import { getTypeDefs } from './typeDefs/typeDefs';
import { getResolvers } from './resolvers/resolvers';
import { Event } from './models/event';
import cors from 'cors';

const app: express.Application = express();
const port = 3000;

app.use(cors());

//DATABASE
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'xcnt',
  entities: [Employee, Event],
  synchronize: true
})
  .then(async connection => { console.log('Connected To DB'); })
  .catch(error => console.log('TypeORM connection error: ', error));

// GRAPH_QL
let typeDefs = getTypeDefs();
let resolvers = getResolvers();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })
);

app.listen(port, () => console.log(`XCNT Graphql API listening on port ${port}!`));