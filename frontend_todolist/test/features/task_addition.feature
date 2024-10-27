Feature: Task Addition

  Scenario: User adds a new task
    Given the user navigates to the homepage
    When the user clicks on the Login button
    And the user clicks on "Add New Task"
    And the user enters "Test Task" as the title
    And the user enters "This is a test task" as the description
    And the user clicks on the Add Task button
    Then the new task "Test Task" should appear in the task list