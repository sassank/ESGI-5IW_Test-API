Feature: Check the user
    Scenario: We can check the get all when have no users
        Given I have no user
        When I send a "GET" request to "users"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive an empty list

    Scenario: We can check the get all when have many users
        Given I have no user
        And I create 5 users
        When I send a "GET" request to "users"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive a list of 5 items

    Scenario: We check that we can get existant user
        Given I create one user
        When I send a "GET" request to "users" for the created user
        Then I should receive a 200 response
        And I should receive an object

    Scenario: We check that we cannot get inexistant user
        When I send a "GET" request to "users/0"
        Then I should receive a 404 response

    Scenario: We check that we can create a new user
        Given I have payload
            | email    | mail@dev.com |
            | password | password     |
        When I send a "POST" request to "users" with payload
        Then I should receive a 201 response

    Scenario: We check that we can update a user
        Given I create one user
        Given I have payload
            | email    | mail@dev.com |
            | password | password     |
        When I send a "PUT" request to "users" with payload for the created user
        Then I should receive a 200 response

    Scenario: We check that we can get existant user
        Given I create one user
        When I send a "DELETE" request to "users" for the created user
        Then I should receive a 204 response