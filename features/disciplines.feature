Feature: Manage disciplines
  Disciplines can only be created/modified by admins.
  Disciplines can be read by everyone autheticated.
  When a discipline is created (by the api or the admin panel) a folder with its name is created in var/git.
  When a discipline is deleted (by the api or the admin panel), the associated folder is deleted.

  @createSchema
  Scenario: A discipline can be created by an admin
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/disciplines" with body:
    """
    {
      "name": "PF"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the git-folder associated with discipline "PF" should exist

  Scenario: Clone at creation works
    Given I am connected to the internet
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/disciplines" with body:
    """
    {
      "name": "Telecoms", "gitUrl": "https://github.com/projet-aaa/Test-git.git"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the git-folder associated with discipline "Telecoms" should exist
    And README file of "Telecoms" folder should exist


  Scenario: Discipline data should be validated. name is unique among Discipline
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/disciplines" with body:
    """
    {"name": "PF"}
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 1 element
    And the JSON response should have the following nodes:
      | node                        | value                                 | type   |
      | @context                    | /api/contexts/ConstraintViolationList |        |
      | @type                       | ConstraintViolationList               |        |
      | hydra:title                 |                                       |        |
      | hydra:description           |                                       |        |
      | violations                  |                                       | array  |
      | violations[0]               |                                       | object |
      | violations[0]->propertyPath | name                                  |        |
      | violations[0]->message      | This value is already used.           |        |

  Scenario: A discipline can't be created by a prof
    Given I authenticate myself as prof
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/disciplines" with body:
    """
    {
      "name": "Cloud et Big data"
    }
    """
    Then the response status code should be 403
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"

  @dropSchema
  Scenario: A discipline can't be created by a student
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/disciplines" with body:
    """
    {
      "name": "Cloud et Big data"
    }
    """
    Then the response status code should be 403
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"