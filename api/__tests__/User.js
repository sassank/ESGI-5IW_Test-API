require('../database/init_database');
const sequelize = require("../database/connexion")
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const User = require('../database/models/User');
const UserGenerator = require('../database/seeders/userSeeder');

afterAll(() => {
    sequelize.close();
});

describe('User routes', () => {
    it('Get all users', async () => {
        const users = await UserGenerator.generateUsers(5);
        const response = await request.get('/users').send();
        
        expect(response.status).toBe(200);
        // Expect content type
        expect(response.type).toBe('application/json');
        // Expect content is array
        expect(Array.isArray(response.body)).toBeTruthy();
        // Expect content is empty
        expect(response.body.length).toBe(users.length);

        users.forEach(user => {
            user.destroy();
        });
    });

    it('Get one users', async () => {
        const user = await UserGenerator.generateUser();
        const userData = user.dataValues;

        const response = await request.get('/users/' + userData.id).send();

        expect(response.status).toBe(200);
        // Expect content type
        expect(response.type).toBe('application/json');
        // Expect content is object
        expect(typeof response.body).toBe('object');
        // Expect content
        expect(response.body.id).toBe(userData.id);
        user.destroy();
    });
});