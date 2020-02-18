export const EventTypeDef =
    `
    scalar Date

    type Event {
        uuid: String
        description: String
        amount: Int
        currency: String
        status: String
        created_at: Date
        employee: Employee
    } 

    type EventPage {
        startIndex: Int
        pageSize: Int
        events: [Event]
    }

    extend type Query {
        event(uuid: String!): Event
        events(status: String, orderBy: String, orderDir: String, startIndex: Int, pageSize: Int): EventPage
    }
    
    extend type Mutation {
        updateEvent(uuid: String!, status: String!): Event!
    }
    `;
