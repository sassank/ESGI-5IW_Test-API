// Init database models
require('../index');
const User = require('../models/User');

it('should create a new user', async () => {
    // Create a new user
    const myUser = await User.create({
        email: "mail@dev.com",
        password: "password"
    });
    console.log(myUser);

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