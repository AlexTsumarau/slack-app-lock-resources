const serviceListeners = require('./../service/listener.js');
const {App} = require('@slack/bolt');
const stateHome = require('./../state/home.js');

require('dotenv').config()

const boltApp = new App({
    token: process.env.slack_token,
    signingSecret: process.env.slack_signing_secret
})

serviceListeners(boltApp);
stateHome.addEnv('testEnv1');

(async () => {
    await boltApp.start(3001);
    console.log('⚡️ Bolt app is running on port 3001. You can use https://ngrok.com/ to make it accessible for Slack API');
})()

