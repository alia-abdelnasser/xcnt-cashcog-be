const request = require('supertest')(`http://localhost:3000`);

describe('Sample Test', () => {
    it('should get an event by uuid', async () => {
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
});