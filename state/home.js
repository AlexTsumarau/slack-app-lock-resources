const mc = require('./../persistence/memcahed.js');

module.exports = (function () {
    'use strict';

    const sFree = 'free'
    const sReserved = 'reserved'
    const kDefault = 'default'

    let state_envs = []
    let cachedReservedTime = {}

    var toggleStatus = function (triggeredEnvName, userName, when) {
        state_envs.forEach(envItem => {
            if (envItem.name === triggeredEnvName) {
                if (envItem.status === sFree) {
                    var now = new Date();
                    envItem.status = sReserved
                    envItem.user = userName
                    envItem.when = now.getHours() + ':' + now.getMinutes();
                } else {
                    envItem.status = sFree
                    envItem.user = null
                    envItem.when = null
                }
            }
        })
    }

    var getEnvs = function () {
        return state_envs;
    }

    var toggleEnvSatus = function (triggeredEnvName, userName) {
        toggleStatus(triggeredEnvName, userName);
        save()
    }

    var cacheReservedTime = function (envName, username, timeStart) {
        cachedReservedTime = {envName: envName, username: username, timeStart: timeStart}
    }

    var addReservedTime = function (envName) {
        state_envs.forEach(envItem => {
            if (envItem.name === cachedReservedTime.envName) {
                envItem.schedule.push({
                    envName: cachedReservedTime.envName,
                    userName: cachedReservedTime.username,
                    timeStart: cachedReservedTime.timeStart
                });
            }
        })
        save()
    }

    var getReservedTimes = function (envName) {
        let result = {}
        state_envs.forEach(envItem => {
            if (envItem.name === envName) {
                result = envItem.schedule;
            }
        });
        return result;
    }

    var removeReservedTime = function (envName, timeStart) {
        state_envs.forEach(envItem => {
            if (envItem.name === envName) {
                envItem.schedule = envItem.schedule.filter(scheduleItem => {
                    return timeStart !== scheduleItem.timeStart
                })
            }
        });
        save()
    }

    var getEnv = function (envName) {
        return state_envs.filter(envItem => {
            return envItem.name === envName
        }).pop();
    }

    var addEnv = function (envName) {
        state_envs.push({
            name: envName,
            status: sFree,
            user: null,
            when: null,
            schedule: [],
            queue: []
        })
        save()
    }

    var removeEnv = function (envName) {
        state_envs = state_envs.filter(envItem => {
            return envItem.name !== envName
        });
        save()
    }

    var save = function () {
        if (mc !== null) {
            console.log('save', state_envs)
            mc.setJson(kDefault, state_envs)
        }
    }

    var restore = async function () {
        if (mc !== null) {
            state_envs = await mc.getJson(kDefault)
            console.log('restore', state_envs)
        }
    }

    var init = function () {
        if (state_envs.length === 0) {
            restore()
        }
    }

    var toggleQueue = function (envName, me) {
        state_envs.forEach(envItem => {
            if (envItem.name === envName) {
                if (Array.isArray(envItem.queue) && (envItem.queue.includes(me) || me === envItem.user)
                ) {
                    var index = envItem.queue.indexOf(me);
                    if (index !== -1) {
                        envItem.queue.splice(index, 1);
                    }
                } else {
                    if (!Array.isArray(envItem.queue)) {
                        envItem.queue = []
                    }
                    envItem.queue.push(me)
                }
            }
        });
        save()
    }

    return {
        getEnvs: getEnvs,
        toggleEnvSatus: toggleEnvSatus,
        cacheReservedTime: cacheReservedTime,
        addReservedTime: addReservedTime,
        getReservedTimes: getReservedTimes,
        removeReservedTime: removeReservedTime,
        getEnv: getEnv,
        addEnv: addEnv,
        removeEnv: removeEnv,
        init: init,
        toggleQueue: toggleQueue,
    };
}());
