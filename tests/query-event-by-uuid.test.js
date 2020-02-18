const request = require('supertest')(`http://localhost:3000`);

describe('Query Get Event By Uuid', () => {
    it('should get event with uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        event(uuid: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8") {
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
        expect(response.body.data).toHaveProperty('event');
    });

    it('should get event with not existing uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        event(uuid:"not-existing-uuid") {
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
                    expect(response.body.data).toHaveProperty('event');
                    expect(response.body.data.event).toEqual(null);
    });

    it('should get event with invalid input key', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        event(invlidInput:"7ab2d07a-98b3-4d72-a687-35bd0ec04da8") {
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

    it('should get event with invalid input value', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        event(uuid: 123) {
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