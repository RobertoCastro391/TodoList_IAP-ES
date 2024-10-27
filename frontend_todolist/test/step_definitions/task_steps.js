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
  const saveButton = await driver.findElement(By.className("save-status-button"));
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

After(async function () {
  if (driver) {
    await driver.quit();
  }
});