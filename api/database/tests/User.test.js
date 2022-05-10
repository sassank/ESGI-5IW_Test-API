// Init database models
require('../init_database');
const sequelize = require('../connexion');
const User = require('../models/User');

afterAll(() => {
    sequelize.close();
});

it('should create a new user', async () => {
    // Create a new user
    const myUser = await User.create({
        email: "mail@dev.com",
        password: "password"
    });

    try {
        expect(myUser).toBeDefined();
        expect(myUser).toBeInstanceOf(User);
        expect(myUser.email).toBe("mail@dev.com");
        expect(myUser.password).toBe("password");
    } finally {
        // Remove the user even if any error occurs
        myUser.destroy();
    }
});