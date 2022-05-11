const User = require('../models/User');

defaultEmail = 'mi@mail.com';
defaultPassword = 'password';

User.factory = {
    addMany: async (count = 5) => {
        let users = [];
        for (let i = 0; i < count; i++) {
            users.push(await User.create({
                email: defaultEmail,
                password: defaultPassword
            }));
        }
        return users;
    },
    addOne: async (email = defaultEmail, password = defaultPassword) => {
        return await User.create({
            email,
            password
        });
    }
};