import  LoginPage from '../src/pages/LoginPage';
import BussnessPage from '../src/pages/BusinessPage'
import { expect } from 'chai';
import USERS from 'helpers/users';
import PATH from 'helpers/urls';
import { wd } from 'core/wdio';

const Name = 'Automation_Test'
const Email = 'mfernandez@paybygroup.com'
const cost = '2000'

describe('Login process', () => {

  beforeEach(()=> {
      LoginPage.open();
  });

  it('User should successfully login with correct credentials', () => {
      LoginPage.loginExistingUser(USERS.ORGANIZER.USER, USERS.ORGANIZER.PASS);
      wd.wait(2);
      expect(browser.getUrl()).to.equal(PATH.BUSINESS_STAGING.URL);
  });
 
  it('User create a new group', () => {
    BussnessPage.Click_CreateGroup();
    BussnessPage.CreateGroup(Name, Email, cost);
  });
  
});