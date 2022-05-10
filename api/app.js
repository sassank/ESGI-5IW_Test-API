
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./database/init_database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/users", require('./routes/user'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app;