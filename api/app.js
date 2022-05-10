
const express = require('express')
const app = express()
require('./database/init_database');

app.use("/users", require('./routes/user'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app;