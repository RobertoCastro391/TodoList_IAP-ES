Feature: Task - Change Detaild

  Scenario: User updates the details of a task
    Given the user navigates to the homepage
    When the user clicks on the Login button
    And the user clicks on the first task in the task list
    And the user clicks on the "Edit Details" button
    And the user enters "This is a new title" in the title field
    And the user enters "This is a new description" in the description field
    And the user clicks on the Save Details button
    Then the task title should be updated to "This is a new title"