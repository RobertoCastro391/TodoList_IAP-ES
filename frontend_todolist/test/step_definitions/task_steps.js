const { Given, When, Then, After } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");

let chai;

(async () => {
  chai = await import("chai");
})();

let driver;

Given("the user navigates to the homepage", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000");
});

When("the user clicks on the Login button", async function () {
  const loginButton = await driver.findElement(By.id("login_button"));
  await loginButton.click();
});

When("the user clicks on {string}", async function (buttonText) {
  const button = await driver.findElement(By.id("openModal"));
  await button.click();
});

When("the user enters {string} as the title", async function (taskTitle) {
  const taskTitleInput = await driver.findElement(By.id("taskTitle"));
  await taskTitleInput.sendKeys(taskTitle);
});

When(
  "the user enters {string} as the description",
  async function (taskDescription) {
    const taskDescriptionInput = await driver.findElement(
      By.id("taskDescription")
    );
    await taskDescriptionInput.sendKeys(taskDescription);
  }
);

When("the user clicks on the Add Task button", async function () {
  const addTaskButton = await driver.findElement(By.id("addTaskButton"));
  await addTaskButton.click();
});


Then(
  "the new task {string} should appear in the task list",
  async function (taskTitle) {
    const { expect } = chai;
    await driver.wait(until.elementLocated(By.id("task_title"), 5000));
    const task = await driver.findElement(
      By.id("task_title")
    );
    text = await task.getText();
    expect(text).to.include(taskTitle);
  }
);

When(
  "the user clicks on the first task in the task list", async function () {
    await driver.wait(until.elementLocated(By.xpath("//h4")), 10000); 
    const task = await driver.findElement(By.xpath("//h4"));
    await task.click();
  }
);

When("the user clicks on the Status button", async function () {
  const statusButton = await driver.findElement(By.id("statusButton"));
  await statusButton.click();
});  

When("the user selects {string} as the status in the dropdown", async function (newStatus) {
  await driver.wait(until.elementLocated(By.className("status-dropdown")), 5000);
  const taskStatusSelect = await driver.findElement(By.className("status-dropdown"));
  await driver.wait(until.elementIsVisible(taskStatusSelect), 5000);
  newStatus = driver.findElement(By.id(newStatus));
  newStatus.click();
});

When("the user clicks on the Save button", async function () {
  const saveButton = await driver.findElement(By.id("saveStatusBtn"));
  await saveButton.click();
});

Then(
  "the task status should be updated to {string}",
  async function (newStatus) {
    const { expect } = chai;
    await driver.wait(until.elementLocated(By.id("status_details"), 5000));
    const task = await driver.findElement(By.id("status_details"));
    text = await task.getText();
    expect(text).to.include(newStatus);
  }
);

When("the user clicks on the {string} button"
, async function (buttonText) {
  const button = await driver.findElement(By.className("button edit"));
  await button.click();
});

When("the user enters {string} in the title field", async function (updatedTitle) {
  const titleInput = await driver.findElement(By.id("editTitle"));
  await titleInput.clear();
  await titleInput.sendKeys(updatedTitle);
});

When("the user enters {string} in the description field", async function (updatedDescription) {
  const titleInput = await driver.findElement(By.id("editDescription"));
  await titleInput.clear();
  await titleInput.sendKeys(updatedDescription);
});

When("the user clicks on the Save Details button", async function () {  
  const saveButton = await driver.findElement(By.className("status-button save"));
  await saveButton.click();
});

Then("the task title should be updated to {string}", async function (updatedTitle) {
  const { expect } = chai;
  await driver.wait(until.elementLocated(By.id("task_title"), 5000));
  const task = await driver.findElement(By.id("task_title"));
  text = await task.getText();
  expect(text).to.include(updatedTitle);
});

// When("the user clicks on the deadline field", async function() {
//   const deadline = await driver.findElement(By.id("deadlineField"));
//   await deadline.click();
// })

// When("the user enters {string} as the deadline", async function (deadlineText) {
//   const deadlineInput = await driver.findElement(By.id("editDeadline"));
//   await deadlineInput.clear();
//   await deadlineInput.sendKeys(deadlineText);
// });

// When("the user clicks on the Save Deadline button", async function () {
//   const saveButton = await driver.findElement(By.id("saveDeadline"));
//   await saveButton.click();
// });

// Then("the task deadline should be updated to {string}", async function (deadlineText) {
//   const { expect } = chai;
//   await driver.wait(until.elementLocated(By.id("deadlineField"), 5000));
//   const task = await driver.findElement(By.id("deadlineField"));
//   text = await task.getText();
//   expect(text).to.include(deadlineText);
// });

When("the user clicks on the {string} button to delete the task", async function (buttonText) {
  const button = await driver.findElement(By.className("button delete"));
  await button.click();
});

When("the user clicks on the {string} button in the alert to delete the task", async function (buttonText) {
  const alert = await driver.switchTo().alert();
  
  if (buttonText === "Confirm") {
    await alert.accept(); // Confirms the alert
  } else if (buttonText === "Cancel") {
    await alert.dismiss(); // Cancels the alert
  }
});

Then("the task with title {string} should be deleted from the task list", async function (taskTitle) {
  await driver.wait(async () => {
    const tasks = await driver.findElements(By.id("task_title"));
    const taskTitles = await Promise.all(tasks.map(async (task) => await task.getText()));
    return !taskTitles.includes(taskTitle);
  }, 5000, `Task with title "${taskTitle}" is still present in the task list`);
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});