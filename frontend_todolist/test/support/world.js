// import { setWorldConstructor } from '@cucumber/cucumber';
const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.driver = null;
  }
}

setWorldConstructor(CustomWorld);
