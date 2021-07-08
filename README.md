# slack-app-lock-resources
Slack app to lock resources
![Example](image.png)

**How to run as serverless offline**
- update .env file
- downgrade Node to 15.4.0: ``npm install 15.4.0; npm use 15.4.0``
- start serverless: `serverless offline --noPrependStageInUrl --httpPort 3001 --printOutput`
- more info: 
  - https://github.com/slackapi/bolt-js/tree/main/examples/deploy-aws-lambda
  - https://slack.dev/bolt-js/deployments/aws-lambda
  - https://github.com/dherault/serverless-offline/issues/1150

**How to deploy to aws lambda**
- ``npx serverless deploy``

**How to run as local server**
- update .env file
- run ``node public/local.js``
- run ngrok http 3001

**How to use another version of Node**
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_HOME=/Users/your-user/.nvm
export PATH=${PATH}:${NVM_HOME}
source ${NVM_HOME}/nvm.sh
nvm --version
nvm install 15.4.0
nvm use 15.4.0

**How to deploy to aws ec2**
- https://codelabs.transcend.io/codelabs/node-terraform/index.html
---
/slack/events
<a href="https://slack.com/oauth/v2/authorize?client_id=2259947788352.2249092805718&scope=commands,incoming-webhook,team:read,chat:write&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
https://slack.com/oauth/v2/authorize?client_id=2259947788352.2249092805718&scope=commands,incoming-webhook,team:read,chat:write&user_scope=
<meta name="slack-app-id" content="A027B2QPPM4">

https://a850d80a76dc.ngrock.io/slack/events?code=2259947788352.2262046366308.454a490fd227cd02fbfe64a55f718e6bbfcdbbd922acf03b61949844f3866cdc&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YWxsT3B0aW9ucyI6eyJzY29wZXMiOlsiY2hhbm5lbHM6cmVhZCIsImdyb3VwczpyZWFkIiwiY2hhbm5lbHM6bWFuYWdlIiwiY2hhdDp3cml0ZSIsImluY29taW5nLXdlYmhvb2siXX0sIm5vdyI6IjIwMjEtMDctMDhUMjA6NDE6MjEuMDgwWiIsImlhdCI6MTYyNTc3Njg4MX0.-T1VQqrsa6yj1hIFHjR0G3D6G6NxrDbyM-FK6sn1HJw

https://a850d80a76dc.ngrok.io/slack/events?code=2259947788352.2279552050656.6d69962ab6c1c183ce2300a94a45df7713abf660ee3536c5cc1ddff8285ef2e2&state=

https://a850d80a76dc.ngrok.io/slack/events?code=2259947788352.2249109275942.510f86c68b4127197ce20fe1fae162b66f19d24cd2ac536a13b522e7a0e0d4e2&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YWxsT3B0aW9ucyI6eyJzY29wZXMiOlsiY2hhbm5lbHM6cmVhZCIsImdyb3VwczpyZWFkIiwiY2hhbm5lbHM6bWFuYWdlIiwiY2hhdDp3cml0ZSIsImluY29taW5nLXdlYmhvb2siXX0sIm5vdyI6IjIwMjEtMDctMDhUMjA6NDQ6MTEuMTExWiIsImlhdCI6MTYyNTc3NzA1MX0.wJWPdSRsIufDnQySMiguW-yn-0JKQJt8RqEnpMdtSyg
