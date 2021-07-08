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
https://a850d80a76dc.ngrok.io/slack/events

<a href="https://slack.com/oauth/v2/authorize?client_id=2122260658704.2238438082451&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:manage,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,emoji:read,files:read,files:write,groups:history,groups:read,groups:write,im:history,im:read,im:write,incoming-webhook,mpim:history,team:read,workflow.steps:execute,links:write&user_scope=admin"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

https://slack.com/oauth/v2/authorize?client_id=2122260658704.2238438082451&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:manage,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,emoji:read,files:read,files:write,groups:history,groups:read,groups:write,im:history,im:read,im:write,incoming-webhook,mpim:history,team:read,workflow.steps:execute,links:write&user_scope=admin
