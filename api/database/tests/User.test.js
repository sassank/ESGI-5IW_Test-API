// Init database models
require('../init_database');
const sequelize = require('../connexion');
const User = require('../models/User');

beforeEach(async () => {
    // Clean the database
    // await User.destroy({ where: {}, force: true });
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

it('should create a new user', async () => {
    // Create a new user
    const myUser = await User.create({
        email: "mail@dev.com",
        password: "password"
    });

    expect(myUser).toBeDefined();
    expect(myUser).toBeInstanceOf(User);
    expect(myUser.email).toBe("mail@dev.com");
    expect(myUser.password).toBe("password");

});