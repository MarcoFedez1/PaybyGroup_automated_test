const timeout = process.env.DEBUG ? 99999999 : 90000;

let chromeArgs = ['--no-sandbox', "window-size=1920,1080", 'disable-infobars', 'disable-extensions', '--lang=en-us', '--disable-dev-shm-usage'];
if(process.env.HEADLESS === 'true') {
    chromeArgs.push('--headless');
}

let runEnv = '';

if(runEnv.env === "staging"){
    serverURL = 'https://bran.paybygroup.com';
} else if (runEnv.env === 'testcase') {
    serverURL = 'https://bran.paybygroup.com';
}
else if (runEnv.env === 'production') {
    serverURL = 'https://bran.paybygroup.com';
}
else {
    serverURL = process.env.ENV === 'staging' ? 'https://bran.paybygroup.com' : 'https://bran.paybygroup.com';
}
console.log(serverURL);


exports.config = {

    runner: 'local',

    specs: [
        './specs/login.spec.ts',
    ],

    maxInstances: 2,

    capabilities: [{
        maxInstances: 2,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: chromeArgs
        }
    }],

    logLevel: 'error',

    deprecationWarnings: true,
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    sync: true,

    baseUrl: serverURL,

    waitforTimeout: 15000,

    connectionRetryTimeout: 90000,
    // Default request retries count
    connectionRetryCount: 3,

    services: ['selenium-standalone'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
      compilers: [
        'tsconfig-paths/register'
      ],
        ui: 'bdd',
        retries: 2,
        timeout: timeout
    },

    before: function () {
      require('ts-node').register({ files: true });
      console.log(browser.options.baseUrl);
    },


    afterTest: function(test) {
        if (process.env.BUILD_DETAILS) {
            const caseId = +test.title.match(/C\d+/)[0].slice(1);
            if(runEnv.untested === undefined || runEnv.untested.includes(caseId)) {
                if (test.passed || test.error !== undefined) {
                    browser.waitUntil(() => {
                            return testRailclient.addResultForCase(runEnv.runId, caseId, {
                                "status_id": test.passed ? 6 : 7,
                                "comment": test.passed ? 'Autotest Passed' : test.error.message,
                            }).then(() => {
                                return true
                            });

                        }, 15000,
                        'Error occurred',
                        10000
                    );
                }
            }
        }
        browser.deleteCookies();
    },
};
