const mc = require('./../persistence/memcahed.js');

module.exports = (function () {
    'use strict';

    const sFree = 'free'
    const sReserved = 'reserved'
    const kDefault = 'default'

    let state_envs = []
    let cachedReservedTime = {}

    var toggleStatus = function (triggeredEnvName, userName, when) {
        let isUsed
        state_envs.forEach(envItem => {
            if (envItem.name.toLowerCase() === triggeredEnvName.toLowerCase()) {
                if (envItem.status === sFree) {
                    var now = new Date();
                    envItem.status = sReserved
                    envItem.user = userName
                    envItem.when = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
                    isUsed = true
                } else {
                    envItem.status = sFree
                    envItem.user = null
                    envItem.when = null
                    isUsed = false
                    envItem.queue = []
                }
            }
        })
        return isUsed
    }

    var getEnvs = function () {
        return state_envs;
    }

    var toggleEnvSatus = function (triggeredEnvName, userName) {
        let isUsed = toggleStatus(triggeredEnvName, userName);
        save()
        return isUsed
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
        return save()
    }

    var removeEnv = function (envName) {
        let before = state_envs.length
        state_envs = state_envs.filter(envItem => {
            return envItem.name.toLowerCase() !== envName.toLowerCase()
        });
        save()
        return state_envs.length !== before
    }

    var save = function () {
        if (mc !== null) {
            //console.log('save', state_envs)
            mc.setJson(kDefault, state_envs)
            return true
        }
        return false
    }

    var restore = async function () {
        if (mc !== null) {
            state_envs = await mc.getJson(kDefault)
            //console.log('restore', state_envs)
        }
    }

    var init = function () {
        if (state_envs.length === 0) {
            restore()
        }
    }

    var toggleQueue = function (envName, me) {
        let isAdded
        state_envs.forEach(envItem => {
            if (envItem.name.toLowerCase() === envName.toLowerCase()) {
                if (Array.isArray(envItem.queue) && (envItem.queue.includes(me) || me === envItem.user)
                ) {
                    var index = envItem.queue.indexOf(me);
                    if (index !== -1) {
                        envItem.queue.splice(index, 1)
                        isAdded = false
                    }
                } else {
                    if (!Array.isArray(envItem.queue)) {
                        envItem.queue = []
                    }
                    envItem.queue.push(me)
                    isAdded = true
                }
            }
        });
        save()
        return isAdded
    }

    var isEnv = function (envName) {
        let found = false
        state_envs.forEach(envItem => {
            if (envItem.name.toLowerCase() === envName.toLowerCase()) {
                found = true
            }
        })
        return found
    }

    var isEnvUsedBy = function (envName, userName) {
        let isUsed = false
        state_envs.forEach(envItem => {
            if (envItem.name.toLowerCase() === envName.toLowerCase() && envItem.user === userName) {
                isUsed = true
            }
        })
        return isUsed
    }

    var isEnvUsed = function (envName) {
        let isUsed = false
        state_envs.forEach(envItem => {
            if (envItem.name.toLowerCase() === envName.toLowerCase()) {
                isUsed = envItem.user != null
            }
        })
        return isUsed
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
        isEnv: isEnv,
        isEnvUsedBy: isEnvUsedBy,
        isEnvUsed: isEnvUsed,
    };
}());
