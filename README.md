# slack-app-lock-resources
Slack app to lock resources
![Example](image.png)

**How to run as serverless offline**
- update .env file
- downgrade Node to 15.4.0: ``npm install 15.4.0; npm use 15.4.0``
- start serverless: `serverless offline --noPrependStageInUrl --httpPort 3001 --printOutput`
- more info: 
  - https://github.com/slackapi/bolt-js/tree/main/examples/deploy-aws-lambda
  - https://slack.dev/bolt-js/deployments/aws-lambd
  - https://github.com/dherault/serverless-offline/issues/1150

**How to run as local server**
- update .env file
- run ``node public/local.js``
- run ngrok http 3001
