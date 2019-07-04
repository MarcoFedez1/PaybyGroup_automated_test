import  LoginPage from '../src/pages/LoginPage';
import BussnessPage from '../src/pages/BusinessPage'
import { expect } from 'chai';
import USERS from 'helpers/users';
import PATH from 'helpers/urls';
import { wd } from 'core/wdio';

const Name = 'Automation_Test'
const Email = 'mfernandez@paybygroup.com'
const cost = '2000'

describe('Create a New group', () => {

  beforeEach(()=> {
      LoginPage.open();
      LoginPage.loginExistingUser(USERS.ORGANIZER.USER, USERS.ORGANIZER.PASS);
  });

 
  it('User should be able to create a new group', () => {
    BussnessPage.Click_CreateGroup();
    BussnessPage.CreateGroup(Name, Email, cost);
  });
  
});