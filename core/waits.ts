export class WaitUntil {
    elementIsVisible(element) {
        return $(element.selector).waitForDisplayed();
    };

    elementIsNotVisible(element) {
        // Reverses statement
        return $(element.selector).waitForDisplayed(null, true);
    };

    elementExists(element) {
        return $(element.selector).waitForExist();
    };

    elementNoLongerExists(element) {
        // Reverses statement
        return $(element.selector).waitForExist(null, true);
    };

    pageURLIsNoLonger(url) {
        return browser.waitUntil(function() {
            return browser.getUrl() !== url;
        }, 10000, `Waited 10 seconds and page URL has not changed from ${url}`);
    };

    pageURLContains(url) {
        return browser.waitUntil(function() {
            return browser.getUrl().includes(url)
        }, 10000, `Waited 10 seconds and user was not navigated to ${url}`);
    };

    elementHasClass(element, expectedClass) {
        return browser.waitUntil(function() {
            return element.getAttribute('class').split(' ').includes(expectedClass);
        }, 1000, `Waited 10 seconds and ${element.selector} did not have the class: ${expectedClass}`);
    };

    elementHasAttributeValue(element, attribute, expectedValue) {
        return browser.waitUntil(function() {
            return element.getAttribute(attribute).split(' ').includes(expectedValue);
        }, 10000, `Waited 10 seconds and ${attribute} was not ${expectedValue} for element: ${element.selector}`);
    };

    elementHasCssProperty(element, cssProperty, expectedValue) {
        return browser.waitUntil(function() {
            return element.getCssProperty(cssProperty).value == expectedValue;
        }, 10000, `Waited 10 seconds and ${cssProperty} was not ${expectedValue} for element: ${element.selector}`);
    };
};

export const wu = new WaitUntil();