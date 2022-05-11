Feature: Check the cars
    Scenario: We can check the get all when have no cars
        Given I have no "car"
        When I send a "GET" request to "cars"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive an empty list

    Scenario: We can check the get all when have many cars
        Given I have no "car"
        And I create 5 "cars"
        When I send a "GET" request to "cars"
        Then I should receive a 200 response
        And I should receive a list of items
        And I should receive a list of 5 items

    Scenario: We check that we can get existant car
        Given I create one "car"
        When I send a "GET" request to "cars" for the created "car"
        Then I should receive a 200 response
        And I should receive an object

    Scenario: We check that we cannot get inexistant car
        When I send a "GET" request to "cars/0"
        Then I should receive a 404 response

    Scenario: We check that we can create a new car
        Given I have payload
            | brand | wolskwagen |
            | color | red        |
            | year  | 2016::int  |
        When I send a "POST" request to "cars" with payload
        Then I should receive a 201 response
        And I should receive an object with payload
            | brand | wolskwagen |
            | color | red        |
            | year  | 2016::int  |


    Scenario: We check that we can update a car
        Given I create one "car"
        Given I have payload
            | brand | wolskwagen |
            | color | red        |
            | year  | 2016::int  |
        When I send a "PUT" request to "cars" with payload for the created "car"
        Then I should receive a 200 response
        And I should receive an object with payload
            | brand | wolskwagen |
            | color | red        |
            | year  | 2016::int  |

    Scenario: We check that we can get existant car
        Given I create one "car"
        When I send a "DELETE" request to "cars" for the created "car"
        Then I should receive a 204 response