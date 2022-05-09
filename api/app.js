
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./database/init_database');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app;