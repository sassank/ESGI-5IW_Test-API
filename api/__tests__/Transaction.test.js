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

describe('transaction', () => {
    
    it('works', () => {
        expect(true).toBeTruthy();
    });
    // it("retournes les transactions", async () => {
    //   const response = await request.get("/transactions").send();
    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveLength(0);
    // });
});
