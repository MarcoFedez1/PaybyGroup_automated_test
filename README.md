# SingleCase web app automation

This project uses WebdriverIO v5 and TypeScript v3, PageObject pattern, Mocha & Chai.

## Getting Started
```
npm install
npm test
```

## Why TypeScript
TypeScript offers the benefit of types, but you won't find them in this project. I have found TypeScript to be great because of the IDE intellisense and support for the latest JavaScript features. Version 5 of WebdriverIO has a type definition file included (you should no longer use @types/webdriverio). This makes autocomplete work well in your IDE: 

You no longer need to explicitly compile your TypeScript to JavaScript using the command `tsc`. This project uses ts-node/register and tsconfig-paths as detailed on the [WebdriverIO TypeScript setup](https://webdriver.io/docs/typescript.html) page. 

## Page Objects
[Page Objects](https://martinfowler.com/bliki/PageObject.html) are a really nifty abstraction for the UI elements that you interact with in your tests. You can create simple getter functions for each element that you need to access. And optionally you can create convenience methods like `loginWithCredentials()` that allow you to write more concise tests. 

##### `src/pages/LoginPage.ts`

```typescript
import BasePage from 'src/pages/BasePage';

class LoginPage extends BasePage {

    get username() {
        return $('#username');
    }

    get password() {
        return $('#password');
    }

    get submit() {
        return $('#login > button');
    }

    loginWithCredentials(username, password) {
        this.username.setValue(username);
        this.password.setValue(password);
        this.submit.click();
    }
}

export default new LoginPage();
```

##### `test/login.spec.ts`


```typescript
import {expect} from 'chai';
import LoginPage from 'src/pages/LogInPage';

describe('Login page', () => {
    it('should allow access with correct credentials', () => {
        LoginPage.open;
        LoginPage.loginWithCredentials('tomsmith', 'SuperSecretPassword!');
        
        expect(LoginPage.flash).to.include('You logged into a secure area!');
    });
});
```

```webdriverio reference
https://webdriver.io/docs/configurationfile.html

## Run headless

https://www.npmjs.com/package/cross-env
npm install --save-dev cross-env

`npm run headless` for running in headless mode
`npm run test` - for running with UI


## Run a specific .spec file
 ./node_modules/.bin/wdio wdio.conf.js --spec ./test/register.spec.ts


 ##  deletes everything except master and the branch I am currently in
 alias gbDA='git branch | egrep -v "(master|\*)" | xargs git branch -D'


 ##To launch test in a dockerized chrome/selenium:
 docker-compose up -d 
 npm run staging...
 docker-compose down

 ENV='staging' npm test
but actually i recommend pass URLS not env names
like 

 ## ENV='https://automation-company.staging.singlecase.cz' npm test
same as:
 ## ENV='staging' npm test
This command works and will run test on local machine without using docker

