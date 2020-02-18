const request = require('supertest')(`http://localhost:3000`);

describe('Mutation Update Event', () => {
    it('should update event status with uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation {
                        updateEvent(uuid: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8",
                        status: "APPROVED") {
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
        expect(response.body.data).toHaveProperty('updateEvent');
        expect(response.body.data.updateEvent.uuid).toEqual("7ab2d07a-98b3-4d72-a687-35bd0ec04da8");
        expect(response.body.data.updateEvent.status).toEqual("APPROVED");
    });

    it('should update event status with not exsisting uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation {
                        updateEvent(uuid: "not-existing-uuid",
                        status: "APPROVED") {
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
                    expect(response.statusCode).toEqual(500); // TODO 404
                    // expect(response.body.data).toHaveProperty('event');
                    // expect(response.body.data.event).toEqual(null);
    });

    it('should update event status with invalid input key', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                mutation {
                    updateEvent(invalidInput: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8",
                    status: "APPROVED") {
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

    it('should update event status with invalid input value', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                mutation {
                    updateEvent(uuid: 123,
                    status: "APPROVED") {
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

    it('should update event status with uuid by invalid status', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                mutation {
                    updateEvent(uuid: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8",
                    status: "INVALID_STATUS") {
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
        expect(response.statusCode).toEqual(200); //TODO 400
    });

    it('should update event status with uuid by invalid key', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                mutation {
                    updateEvent(uuid: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8",
                    invalidInput: "APPROVED") {
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

    it('should update event status with uuid by invalid value', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                mutation {
                    updateEvent(uuid: "7ab2d07a-98b3-4d72-a687-35bd0ec04da8",
                    status: 123) {
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