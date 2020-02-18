const request = require('supertest')(`http://localhost:3000`);

describe('Query Get Employee By Uuid', () => {
    it('should get employee with uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        employee(uuid: "04bcdee7-5070-4c65-9a43-396e83175f07") {
                            uuid
                            first_name
                            last_name
                        }
                    }`});
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toHaveProperty('employee');
    });

    it('should get employee with not existing uuid', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        employee(uuid:"not-existing-uuid") {
                            uuid
                            first_name
                            last_name
                        }
                    }`});
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toHaveProperty('employee');
        expect(response.body.data.employee).toEqual(null);
    });

    it('should get employee with invalid input key', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        employee(invlidInput:"04bcdee7-5070-4c65-9a43-396e83175f07") {
                            uuid
                            first_name
                            last_name
                        }
                    }`});
        expect(response.statusCode).toEqual(400);
    });

    it('should get employee with invalid input value', async () => {
        const response = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query {
                        employee(uuid: 123) {
                            uuid
                            first_name
                            last_name
                        }
                    }`});
        expect(response.statusCode).toEqual(400);
    });
});