import { wd } from 'core/wdio';
import URL from '../../helpers/urls';

class BusinessPage{

    elements = {
        createGroup: '//*[@id="app-container"]/div/div/nav/div[2]/ul/a[1]/li/div/span',
        name: '//input[@name="name"]',
        OrganizerEmail: '//input[@name="organizerEmail"]',
        cost: '//input[@name="costs[0].amount"]',
        SendBnt: '//button[@name="button"]'
    };

    Click_CreateGroup() {
        wd.click(this.elements.createGroup);
    };

    CreateGroup(organizerEmail:string, groupName:string, cost:string){
        wd.setValue(this.elements.OrganizerEmail, organizerEmail);
        wd.setValue(this.elements.name, groupName);
        wd.setValue(this.elements.cost, cost);
        wd.click(this.elements.SendBnt);
        wd.waitForLoadComplete();
    }

}
export default new BusinessPage();