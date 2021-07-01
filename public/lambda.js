const { App, AwsLambdaReceiver } = require('@slack/bolt');
const serviceListeners = require('./../service/listener.js');

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const boltApp = new App({
    token: process.env.slack_bot_token,
    receiver: awsLambdaReceiver,
    processBeforeResponse: true
});

serviceListeners(boltApp);

module.exports.handler = async (event, context, callback) => {
    const handler = await boltApp.start();
    return handler(event, context, callback);
}
