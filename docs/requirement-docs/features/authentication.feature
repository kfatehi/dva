Feature: Authentication
  As a User
  I want to login
  Because I want to protect my content

  Scenario: Registration
    Given I go to "/register"
    When I fill the registration form with valid input and hit submit
    Then I am redirected to "/profile"
