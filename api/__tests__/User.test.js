require('../database/init_database');
const sequelize = require("../database/connexion")
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const User = require('../database/models/User');

beforeAll(async () => {
    // Clean the database
    await User.destroy({ where: {}, force: true });
})

beforeEach(async () => {
    // Listen for any sql request
    await sequelize.ezTransaction.listen();
})

afterEach(async () => {
    // Rollback the transaction
    await sequelize.ezTransaction.rollback();
})

afterAll(async () => {
    // Close the connexion
    sequelize.close();
});

describe('User routes', () => {
    it('should get all users', async () => {
        const users = await User.factory.addMany(1);
        const response = await request.get('/users').send();

        expect(response.status).toBe(200);
        // Expect content type
        expect(response.type).toBe('application/json');
        // Expect content is array
        expect(Array.isArray(response.body)).toBeTruthy();
        // Expect content is empty
        expect(response.body).toHaveLength(users.length);
    });

    it('should get one user', async () => {
        const user = await User.factory.addOne();
        const userData = user.dataValues;

        const response = await request.get('/users/' + userData.id).send();

        expect(response.status).toBe(200);
        // Expect content type
        expect(response.type).toBe('application/json');
        // Expect content is object
        expect(typeof response.body).toBe('object');
        // Expect content
        expect(response.body.id).toBe(userData.id);
    });

    it('should not get any user', async () => {
        const user = await User.factory.addOne();

        const response = await request.get('/users/0').send();

        expect(response.status).toBe(404);
        // Expect content type
        expect(response.type).toBe('application/json');
    });

    it('should add one user', async () => {
        const response = await request.post('/users')
            .send({
                email: 'mail@dev.com',
                password: 'password'
            });

        expect(response.status).toBe(201); // 201 = Created
        expect(response.type).toBe('application/json'); // Expect content type
        expect(typeof response.body).toBe('object'); // Expect content is object
    });

    it('should update one user', async () => {
        const user = await User.factory.addOne('mail1@dev.com');
        const response = await request.put('/users/' + user.dataValues.id)
            .send({
                email: 'mail2@dev.com',
                password: 'password'
            });

        expect(response.status).toBe(200); // 200 = OK
        expect(response.type).toBe('application/json'); // Expect content type
        expect(typeof response.body).toBe('object'); // Expect content is object
        expect(response.body.email).toBe('mail2@dev.com'); // Expect content is object
    });

    it('should not find any user to update', async () => {
        const user = await User.factory.addOne('mail1@dev.com');
        const response = await request.put('/users/0')
            .send({
                email: 'mail2@dev.com',
                password: 'password'
            });

        expect(response.status).toBe(404); // 200 = OK
        expect(response.type).toBe('application/json'); // Expect content type
        expect(typeof response.body).toBe('object')
    });

    it('should delete one user', async () => {
        const user = await await User.factory.addOne();
        const response = await request.delete('/users/' + user.dataValues.id)
            .send();

        expect(response.status).toBe(204); // 200 = OK
    });
});