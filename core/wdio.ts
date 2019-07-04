export class Wdio {

    setValue(selector: string, value: any) {
        $(selector).waitForEnabled();
        $(selector).setValue(value);
    }

    addValue(selector: string, value: any) {
        $(selector).waitForEnabled();
        $(selector).addValue(value);
    }

    getValue(selector: string) {
        return $(selector).getValue();
    }

    click(selector: string) {
        $(selector).waitForEnabled();
        $(selector).click();
    }

    getText(selector: string) {
        return $(selector).getText();
    }

    wait(seconds: number) {
        browser.pause(seconds * 1000);
    }

    moveTo(selector: string) {
        $(selector).moveTo();
    }

    openUrl(url: string) {
        browser.url(url);
    }

    selectByVisibleText(selector: string, text: string) {
        $(selector).selectByVisibleText(text);
    }

    elementDisplayed(selector: string) {
        return $(selector).isDisplayed();
    }

    elementIsSelected(selector: string) {
        return $(selector).isSelected();
    }

    elementIsExisting(selector: string) {
        $(selector).isExisting();
        return $(selector).isExisting();
    }

    waitForExist(selector: string) {
        $(selector).waitForExist(10000);
        return $(selector).waitForExist();
    }

    waitForLoadComplete() {
        $('.loading-indicator').waitForExist(30000, true);
    }

    waitForCaseSearchToComplete() {
        $('.fa.fa-spinner.fa-spin').waitForExist(30000, true);
    }

}
export const wd = new Wdio();