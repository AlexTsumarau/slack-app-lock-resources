const {App} = require('@slack/bolt');
const serviceTemplates = require('./templates.js');
const stateHome = require('./../state/home.js');

module.exports = function (boltApp) {

    stateHome.init();

    const log = async (msg) => {
        //await say(`Pong <@${message.user}>: ` + new Date());
    }

    boltApp.message('ping', async ({message, say}) => {
        await say(`Pong <@${message.user}>: ` + new Date());
    })

    boltApp.event('app_home_opened', async ({event, client}) => {
        try {
            let envs_blocks = serviceTemplates('home/row', stateHome.getEnvs());
            await client.views.publish({
                user_id: event.user,
                view: {
                    "type": "home",
                    "blocks": envs_blocks
                }
            });
        } catch (error) {
            console.error(error);
        }
    })

    const reRenderHome = async function (ack, body, client) {
        try {
            let envs_blocks = serviceTemplates('home/row', stateHome.getEnvs());
            await client.views.update({
                view_id: body.view.id,
                hash: body.view.hash,
                view: {
                    type: 'home',
                    callback_id: 'view_1',
                    blocks: envs_blocks
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    boltApp.action('btn_use', async ({ack, body, client}) => {
        await ack();
        const selectedEnvName = body.actions[0].value;
        const userName = body.user.name
        stateHome.toggleEnvSatus(selectedEnvName, userName)
        reRenderHome(ack, body, client);
    })

    boltApp.action('modal_schedule_open', async ({ack, body, client}) => {
        const selectedEnvName = body.actions[0].value
        try {
            let modal_schedule = serviceTemplates('modal/schedule', stateHome.getEnv(selectedEnvName));
            await client.views.open({
                trigger_id: body.trigger_id,
                view: modal_schedule
            });
        } catch (error) {
            console.error(error);
        }
    })

    boltApp.action('modal_schedule_timepicker_selected', async ({ack, body, client}) => {
        await ack();
        const envName = body.actions[0].block_id
        const userName = body.user.name
        const selectedTime = body.actions[0].selected_time

        stateHome.cacheReservedTime(envName, userName, selectedTime);
    })

    boltApp.view('modal_schedule', async ({ack, body, view, client}) => {
        await ack()
        const selectedEnvName = view.blocks[0].block_id

        stateHome.addReservedTime(selectedEnvName);
    })

    boltApp.action('remove_time', async ({ack, body, client}) => {
        await ack()
        let val = body.actions[0].value
        val = val.split('/')
        stateHome.removeReservedTime(val[0], val[1])
    });

    boltApp.action('btn_queue', async ({ack, body, client}) => {
        await ack()
        const envName = body.actions[0].value
        const userName = body.user.name
        stateHome.toggleQueue(envName, userName)
        reRenderHome(ack, body, client);
    });

    boltApp.command('/add_env', async ({ack, body, say}) => {
        await ack();
        stateHome.addEnv(body.text)
        await say(`New environment "${body.text}" added`);
    });

    boltApp.command('/remove_env', async ({ack, body, say}) => {
        await ack();
        stateHome.removeEnv(body.text)
        await say(`Environment "${body.text}" removed`);
    });

    boltApp.action('btn_refresh', async ({ack, body, client}) => {
        await ack()
        reRenderHome(ack, body, client);
    });
}
