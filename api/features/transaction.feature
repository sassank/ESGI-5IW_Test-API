Feature: Check the transactions
    Scenario: We can check the get all when have no transactions
        Given I have no "transaction"
        When I send a "GET" request to "transactions"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive an empty list

    Scenario: We can check the get all when have many transactions
        Given I have no "transaction"
        And I create 5 "transactions"
        When I send a "GET" request to "transactions"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive a list of 5 items

    Scenario: We check that we can get existant transaction
        Given I create one "transaction"
        When I send a "GET" request to "transactions" for the created "transaction"
        Then I should receive a 200 response
        And I should receive an object

    Scenario: We check that we cannot get inexistant transaction
        When I send a "GET" request to "transactions/0"
        Then I should receive a 404 response

    Scenario: We check that we can create a new transaction
        Given I have payload
            | price | 3500::int |
        When I send a "POST" request to "transactions" with payload
        Then I should receive a 201 response
        And I should receive an object with payload
            | price | 3500::int |


    Scenario: We check that we can update a transaction
        Given I create one "transaction"
        Given I have payload
            | price | 3500::int |
        When I send a "PUT" request to "transactions" with payload for the created "transaction"
        Then I should receive a 200 response
        And I should receive an object with payload
            | price | 3500::int |

    Scenario: We check that we can get existant transaction
        Given I create one "transaction"
        When I send a "DELETE" request to "transactions" for the created "transaction"
        Then I should receive a 204 response