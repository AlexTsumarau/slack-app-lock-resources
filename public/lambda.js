const {App, AwsLambdaReceiver} = require('@slack/bolt');
const serviceListeners = require('./../service/listener.js');
require('dotenv').config()
const stateHome = require('./../state/home.js');

module.exports.handler = async (event, context, callback) => {

    const boltApp = new App({
        token: process.env.slack_bot_token,
        receiver: new AwsLambdaReceiver({
            signingSecret: process.env.slack_signing_secret,
        }),
        processBeforeResponse: true
    });

    serviceListeners(boltApp);
    stateHome.addEnv('testEnv1');

    const handler = await boltApp.start(3001);
    return handler(event, context, callback);
}
