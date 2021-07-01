module.exports = (function () {
    'use strict';

    const sFree = 'free'
    const sReserved = 'reserved'

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

    var setEnvs = function (triggeredEnvName, userName) {
        toggleStatus(triggeredEnvName, userName);
    }

    var cacheReservedTime = function (envName, username, time) {
        cachedReservedTime = {envName: envName, username: username, time: time}
    }

    var addReservedTime = function (envName) {
        state_envs.forEach(envItem => {
            if (envItem.name === cachedReservedTime.envName) {
                envItem.schedule.push({
                    envName: cachedReservedTime.envName,
                    userName: cachedReservedTime.username,
                    time: cachedReservedTime.time
                });
            }
        })
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

    var removeReservedTime = function (envName, time) {
        state_envs.forEach(envItem => {
            if (envItem.name === envName) {
                envItem.schedule = envItem.schedule.filter(scheduleItem => {
                    return time !== scheduleItem.time
                })
            }
        });
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
            schedule: []
        })
    }

    var removeEnv = function (envName) {
        state_envs = state_envs.filter(envItem => {
            return envItem.name !== envName
        });
    }

    return {
        getEnvs: getEnvs,
        setEnvs: setEnvs,
        cacheReservedTime: cacheReservedTime,
        addReservedTime: addReservedTime,
        getReservedTimes: getReservedTimes,
        removeReservedTime: removeReservedTime,
        getEnv: getEnv,
        addEnv: addEnv,
        removeEnv: removeEnv,
    };
}());
