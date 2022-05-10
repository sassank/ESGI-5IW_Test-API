const sequelize = require("../database/connexion")

afterEach(() => {
    sequelize.close();
});

describe('transaction', () => {
    it('works', () => {
        expect(true).toBeTruthy();
    });
    it("retournes les transactions", async () => {
      const response = await request.get("/transactions").send();
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
});
