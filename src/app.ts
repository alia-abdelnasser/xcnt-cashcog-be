import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { EventsService } from './services/events.service';
import { EmployeesService } from './services/employees.service';

const app: express.Application = express();
const port = 3000;

let typeDefs: any = [`
  type Query {
    xcnt: String
  }
     
  type Mutation {
    xcnt(name: String) : String
  }
`];

let xcnt: String = 'XCNT!';

let resolvers = {
  Query: {
    xcnt: () => xcnt
  },
  Mutation: {
    xcnt: (_: any, data: any) => {
      return `${xcnt} welcomes ${data.name}`;
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