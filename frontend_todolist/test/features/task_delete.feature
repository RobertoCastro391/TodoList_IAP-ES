Feature: Task - Delete Task

  Scenario: User deleted a task
    Given the user navigates to the homepage
    When the user clicks on the Login button
    And the user clicks on the first task in the task list
    And the user clicks on the "Delete this Task" button to delete the task
    And the user clicks on the "Confirm" button in the alert to delete the task
    Then the task with title "This is a new title" should be deleted from the task list