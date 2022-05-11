const { Given, When, Then, Before, After, AfterAll } = require("@cucumber/cucumber");
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../database/connexion');
const { expect } = require('expect');
const User = require('../database/models/User');
const Car = require('../database/models/Car');
const Transaction = require('../database/models/Transaction');
const client = supertest(app);

// Create a function to interpolate content

/**
 * Check a http method
 * @param {String} method A http method to check
 */
const checkMethodIsValid = function (method) {
    // Check the http method is valid
    if (!["GET", "POST", "PUT", "DELETE"].includes(method.toUpperCase())) {
        throw new Error("Invalid http method");
    }
    if (typeof client[method.toLowerCase()] !== "function") {
        throw new Error("Invalid http method. \"" + method.toLowerCase() + "\" is not a function");
    }
};

function interpolateByType(handle) {
    let type = "";
    handle = handle.replace(/\:\:(.*)/g, (match, key) => {
        type = key;
        return "";
    });
    if (type === "int") {
        return parseInt(handle);
    }
    return handle;
}


/**
 * Sanitize the path (ltrim / from path)
 * @param {String} path The path to check
 * @returns String
 */
const sanitizePath = function (path) {
    return "/" + path.replace(/^\/+/, "");
};

Before(async () => {
    // Clean the database
    // await User.destroy({ where: {}, force: true });
    // Listen for any sql request
    await sequelize.ezTransaction.listen();
})

After(async () => {
    // Rollback the transaction
    await sequelize.ezTransaction.rollback();
})

AfterAll(async () => {
    // Close the connexion
    await sequelize.close();
});

Given("I have payload", function (dataTable) {
    let payload = dataTable.rowsHash();
    for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
            payload[key] = interpolateByType(payload[key]);
        }
    }
    this.payload = payload;
});

Given("I have no {string}", async function (entity) {
    switch (entity) {
        case "user":
            await User.destroy({ where: {}, force: true });
            break;
        case "car":
            await Car.destroy({ where: {}, force: true });
            break;
        case "transaction":
            await Transaction.destroy({ where: {}, force: true });
            break;
    }
});

Given("I create one {string}", async function (entity) {
    switch (entity) {
        case "user":
            this.user = await User.factory.addOne();
            break;
        case "car":
            this.car = await Car.factory.addOne();
            break;
        case "transaction":
            this.transaction = await Transaction.factory.addOne();
            break;
    }
});

Given("I create {int} {string}", async function (count, entity) {
    switch (entity) {
        case "users":
            await User.factory.addMany(count);
            break;
        case "cars":
            await Car.factory.addMany(count);
            break;
        case "transactions":
            await Transaction.factory.addMany(count);
            break;
    }
});

When("I send a {string} request to {string}", async function (method, path) {
    checkMethodIsValid(method);
    path = sanitizePath(path);

    this.request = client[method.toLowerCase()](path)
        .set('Content-Type', 'application/json');
    this.response = await this.request.send();
});

When("I send a {string} request to {string} for the created {string}",
    async function (method, path, entity) {
        checkMethodIsValid(method);
        path = sanitizePath(path);

        if (!["user", "car", "transaction"].includes(entity)) {
            throw new Error("Entity \"" + entity + "\" not supported.");
        }
        if (this[entity] === undefined) {
            throw new Error("The entity \"" + entity + "\" has no registered value.");
        }
        const entityId = this[entity].id;
        this.request = client[method.toLowerCase()](path + "/" + entityId)
            .set('Content-Type', 'application/json');
        this.response = await this.request.send();
    });

When("I send a {string} request to {string} with payload", async function (method, path) {
    checkMethodIsValid(method);
    path = sanitizePath(path);

    this.request = client[method.toLowerCase()](path)
        .set('Content-Type', 'application/json');
    this.response = await this.request.send(this.payload);
});

When("I send a {string} request to {string} with payload for the created {string}",
    async function (method, path, entity) {
        checkMethodIsValid(method);
        path = sanitizePath(path);

        if (!["user", "car", "transaction"].includes(entity)) {
            throw new Error("Entity \"" + entity + "\" not supported.");
        }
        if (this[entity] === undefined) {
            throw new Error("The entity \"" + entity + "\" has no registered value.");
        }
        const entityId = this[entity].id;
        this.request = client[method.toLowerCase()](path + "/" + entityId)
            .set('Content-Type', 'application/json');
        this.response = await this.request.send(this.payload);
    });

Then("I should receive a {int} response", function (status) {
    expect(this.response.status).toBe(status);
});

Then("I should receive an object", function () {
    expect(this.response.body).toBeInstanceOf(Object);
});

Then("I should receive an object with payload", function (dataTable) {
    // const data = dataTable.rowsHash();


    expect(this.response.body).toBeInstanceOf(Object);
    // Check the keys and result
    // expect(this.response.body).toEqual(expect.objectContaining(dataTable.rowsHash()));
    // Check the results
    for (const key in dataTable.rowsHash()) {
        if (Object.hasOwnProperty.call(dataTable.rowsHash(), key)) {
            let row = dataTable.rowsHash()[key];
            row = interpolateByType(row);
            expect(this.response.body[key]).toBe(row);
        }
    }
});

Then("I should receive a list of items", function () {
    expect(Array.isArray(this.response.body)).toBeTruthy();

});

Then("I should receive an empty list", function () {
    expect(Array.isArray(this.response.body)).toBeTruthy();
    expect(this.response.body).toHaveLength(0);
});

Then("I should receive a list of {int} items", function (elementQuantity) {
    expect(Array.isArray(this.response.body)).toBeTruthy();
    expect(this.response.body).toHaveLength(elementQuantity);
});