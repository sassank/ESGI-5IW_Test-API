const sequelize = require("../database/connexion")

afterEach(() => {
    sequelize.close();
});

describe('Car routes', () => {
    it('works', () => {
        expect(true).toBeTruthy();
    });
});