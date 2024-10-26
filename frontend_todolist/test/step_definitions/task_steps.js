const { Given, When, Then, After } = require("@cucumber/cucumber");
const { Builder, By } = require("selenium-webdriver");

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

When("the user selects {string} as the status", async function (taskStatus) {
  const taskStatusSelect = await driver.findElement(By.id("taskStatus"));
  await taskStatusSelect.sendKeys(taskStatus);
});

When("the user clicks on the Add Task button", async function () {
  const addTaskButton = await driver.findElement(By.id("addTaskButton"));
  await addTaskButton.click();
});


Then(
  "the new task {string} should appear in the task list",
  async function (taskTitle) {
    const { expect } = chai;
    const task = await driver.findElement(
      By.xpath(`//h4[text()='${taskTitle}']`)
    );
    expect(await task.isDisplayed()).to.be.true;
  }
);

After(async function () {
  if (driver) {
    await driver.quit();
  }
});
