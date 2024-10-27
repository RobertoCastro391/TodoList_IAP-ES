Feature: Task - Change Status

  Scenario: User updates the status of a task
    Given the user navigates to the homepage
    When the user clicks on the Login button
    And the user clicks on the first task in the task list
    And the user clicks on the Status button
    And the user selects "In Progress" as the status in the dropdown
    And the user clicks on the Save button
    Then the task status should be updated to "In Progress"