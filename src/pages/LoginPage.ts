import { wd } from 'core/wdio';
import URL from '../../helpers/urls';

class login{

    elements = {
        userEmail: '//input[@name="email"]',
        userPass: '//input[@name="password"]',
        submit: '//button[@type="submit"]'
    };

    open() {
        browser.deleteAllCookies();
        browser.url(URL.BUSINESS_STAGING.URL)
    };

    loginExistingUser(username:string, password:string) {
        wd.setValue(this.elements.userEmail, username);
        wd.setValue(this.elements.userPass, password);
        wd.click(this.elements.submit);
        wd.waitForLoadComplete();
    }

}
export default new login();