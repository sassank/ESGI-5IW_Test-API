require('../database/init_database');
const sequelize = require("../database/connexion")

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

describe('Car routes', () => {
    it('works', () => {
        expect(true).toBeTruthy();
    });
});