import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { EventsService } from './EventsService';
import { EmployeesService } from './EmployeesService';

const app: express.Application = express();
const port = 3000;

let typeDefs: any = [`
  type Query {
    xcnt: String
  }
     
  type Mutation {
    xcnt(message: String) : String
  }
`];

let xcnt: String = 'Hello XCNT!';

let resolvers = {
  Query: {
    xcnt: () => xcnt
  },
  Mutation: {
    xcnt: (_: any, data: any) => {
      return data.message;
    }
  }
};

let employeesService = new EmployeesService();
typeDefs += employeesService.configTypeDefs();
employeesService.configResolvers(resolvers);

let eventsService = new EventsService();
typeDefs += eventsService.configTypeDefs();
eventsService.configResolvers(resolvers);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })
);
app.listen(port, () => console.log(`XCNT Graphql API listening on port ${port}!`));