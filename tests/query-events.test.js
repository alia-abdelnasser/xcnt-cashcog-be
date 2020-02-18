const request = require('supertest')(`http://localhost:3000`);

describe('Query Get Events', () => {
    it('should get first 10 events sorted by created_at (default)', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        events {
                            uuid
                            description
                            amount
                            currency
                            status
                            created_at
                            employee {
                                uuid
                                first_name
                                last_name
                            }
                        }
                    }`});
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toHaveProperty('events');
        expect(response.body.data.events.length).toEqual(10);
    });

    it('should get PENDING events from index 5 with page size 5 sorted by amount', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        events(status:"PENDING", 
                        startIndex: 5, 
                        pageSize: 5,
                        orderBy: "amount", 
                        orderDir:"ASC") {
                            uuid
                            description
                            amount
                            currency
                            status
                            created_at
                            employee {
                                uuid
                                first_name
                                last_name
                            }
                        }
                    }`});
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toHaveProperty('events');
        expect(response.body.data.events.length).toEqual(4);
    });

    it('should get events with invalid input key', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        events(invlidInput:"PENDING") {
                            uuid
                            description
                            amount
                            currency
                            status
                            created_at
                            employee {
                                uuid
                                first_name
                                last_name
                            }
                        }
                    }`});
        expect(response.statusCode).toEqual(400);
    });

    it('should get events with invalid input value', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        events(status: 123) {
                            uuid
                            description
                            amount
                            currency
                            status
                            created_at
                            employee {
                                uuid
                                first_name
                                last_name
                            }
                        }
                    }`});
        expect(response.statusCode).toEqual(400);
    });
});