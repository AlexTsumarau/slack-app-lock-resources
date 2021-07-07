const serviceListeners = require('./../service/listener.js');
const {App} = require('@slack/bolt');
const stateHome = require('./../state/home.js');

require('dotenv').config()

const boltApp = new App({
    signingSecret: process.env.slack_signing_secret,
    clientId: process.env.slack_client_id,
    clientSecret: process.env.slack_client_secret,
    scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
    installerOptions: {
        authVersion: 'v2', // default  is 'v2', 'v1' is used for classic slack apps
        metadata: 'some session data',
        installPath: '/slack/install',
        redirectUriPath: '/slack/redirect',
        callbackOptions: {
            success: (installation, installOptions, req, res) => {
                // Do custom success logic here
                res.send('successful!');
            },
            failure: (error, installOptions , req, res) => {
                // Do custom failure logic here
                res.send('failure');
            }
        },
        stateStore: {
            // Do not need to provide a `stateSecret` when passing in a stateStore
            // generateStateParam's first argument is the entire InstallUrlOptions object which was passed into generateInstallUrl method
            // the second argument is a date object
            // the method is expected to return a string representing the state
            generateStateParam: async (installUrlOptions, date) => {
                // generate a random string to use as state in the URL
                const randomState = randomStringGenerator();
                // save installOptions to cache/db
                await myDB.set(randomState, installUrlOptions);
                // return a state string that references saved options in DB
                return randomState;
            },
            // verifyStateParam's first argument is a date object and the second argument is a string representing the state
            // verifyStateParam is expected to return an object representing installUrlOptions
            verifyStateParam:  async (date, state) => {
                // fetch saved installOptions from DB using state reference
                const installUrlOptions = await myDB.get(randomState);
                return installUrlOptions;
            }
        },
    }
});

serviceListeners(boltApp);

(async () => {
    await boltApp.start(3000);
    console.log('⚡️ Bolt app is running on port 3000. You can use https://ngrok.com/ to make it accessible for Slack API');
})()

