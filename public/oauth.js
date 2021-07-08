const serviceListeners = require('./../service/listener.js');
const {App} = require('@slack/bolt');
const stateSettings = require('./../state/settings.js');

require('dotenv').config()

const boltApp = new App({
    signingSecret: process.env.slack_signing_secret,
    clientId: process.env.slack_client_id,
    clientSecret: process.env.slack_client_secret,
    stateSecret: 'my-state-secret',
    scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
    installationStore: {
        storeInstallation: async (installation) => {
            // change the line below so it saves to your database
            if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
                // support for org wide app installation
                return await stateSettings.set(installation.enterprise.id, installation);
            }
            if (installation.team !== undefined) {
                // single team app installation
                return await stateSettings.set(installation.team.id, installation);
            }
            throw new Error('Failed saving installation data to installationStore');
        },
        fetchInstallation: async (installQuery) => {
            // change the line below so it fetches from your database
            if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                // org wide app installation lookup
                return await stateSettings.get(installQuery.enterpriseId);
            }
            if (installQuery.teamId !== undefined) {
                // single team app installation lookup
                return await stateSettings.get(installQuery.teamId);
            }
            throw new Error('Failed fetching installation');
        },
    },
});

serviceListeners(boltApp);

(async () => {
    await boltApp.start(3000);
    console.log('⚡️ Bolt app is running on port 3000. You can use https://ngrok.com/ to make it accessible for Slack API');
})()

