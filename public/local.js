const serviceListeners = require('./../service/listener.js');
const {App, ExpressReceiver} = require('@slack/bolt');
require('dotenv').config()

const receiver = new ExpressReceiver({ signingSecret: process.env.slack_signing_secret });
const boltApp = new App({
    token: process.env.slack_bot_token,
    receiver
})

serviceListeners(boltApp);

receiver.router.get('/', (req, res) => {
    // You're working with an express req and res now.
    res.send('ok');
});


(async () => {
    await boltApp.start(3000);
    console.log('⚡️ Bolt app is running on port 3000. You can use https://ngrok.com/ to make it accessible for Slack API');
})()

