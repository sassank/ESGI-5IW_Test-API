require('../init_database');

const User = require('../models/User');

defaultEmail = 'mi@mail.com';
defaultPassword = 'password';

const UserGenerator = {
    generateUsers: async (count) => {
        let users = [];
        for (let i = 0; i < count; i++) {
            users.push(await User.create({
                email: defaultEmail,
                password: defaultPassword
            }));
        }
        return users;
    },
    generateUser: async (email = defaultEmail, password = defaultPassword) => {
        return await User.create({
            email,
            password
        });
    }
};

module.exports = UserGenerator;