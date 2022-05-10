const { Given, When, BeforeAll, Then, AfterAll } = require("@cucumber/cucumber");
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../database/connexion');
const { expect } = require('expect');
const UserGenerator = require('../database/seeders/userSeeder');
const User = require('../database/models/User');
const client = supertest(app);

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

/**
 * Sanitize the path (ltrim / from path)
 * @param {String} path The path to check
 * @returns String
 */
const sanitizePath = function (path) {
    return "/" + path.replace(/^\/+/, "");
};

AfterAll(async () => {
    // Close the connexion
    await sequelize.close();
});

Given("I have payload", function (dataTable) {
    this.payload = dataTable.rowsHash();
});

Given("I have no user", async function () {
    await User.destroy({ where: {}, force: true });
});

Given("I create one user", async function () {
    this.user = await UserGenerator.generateUser();
});

Given("I create {int} users", async function (count) {
    await UserGenerator.generateUsers(count);
});

When("I send a {string} request to {string}", async function (method, path) {
    checkMethodIsValid(method);
    path = sanitizePath(path);

    this.request = client[method.toLowerCase()](path)
        .set('Content-Type', 'application/json');
    this.response = await this.request.send();
});

When("I send a {string} request to {string} for the created user", async function (method, path) {
    checkMethodIsValid(method);
    path = sanitizePath(path);

    this.request = client[method.toLowerCase()](path + "/" + this.user.id)
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

When("I send a {string} request to {string} with payload for the created user", async function (method, path) {
    checkMethodIsValid(method);
    path = sanitizePath(path);

    this.request = client[method.toLowerCase()](path + "/" + this.user.id)
        .set('Content-Type', 'application/json');
    this.response = await this.request.send(this.payload);
});

Then("I should receive a {int} response", function (status) {
    expect(this.response.status).toBe(status);
});

Then("I should receive an object", function () {
    expect(this.response.body).toBeInstanceOf(Object);
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