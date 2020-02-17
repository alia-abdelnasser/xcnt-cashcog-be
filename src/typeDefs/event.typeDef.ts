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

    extend type Query {
        event(uuid: String!): Event
        events: [Event!]
    }
    
    extend type Mutation {
        updateEvent(uuid: String!, status: String!): Event!
        createEvent(uuid: String, description: String, created_at: String, amount: Int, currency: String): Event
    }
    `;
