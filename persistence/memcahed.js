require('dotenv').config()
const memjs = require('memjs');
const {promisify} = require('util');

module.exports = (function () {
    'use strict';

    var mc = null;
    var init = function () {
        if (mc !== null) {
            return
        }
        mc = memjs.Client.create(
            process.env.memcached_host,
            {
                username: process.env.memcached_user,
                password: process.env.memcached_pass
            });
    }
    init()

    var set = function (key, val) {
        mc.set(key, val)
    }

    var get = async function (key) {
        const result = (await getMcGet())(key);
        return result
    }

    var setJson = function (key, val) {
        mc.set(key, JSON.stringify(val))
    }

    var getMcGet = function () {
        return promisify(mc.get).bind(mc)
    }

    var getJson = async function (key) {
        const result = await getMcGet()(key)
        return JSON.parse(result.toString())
    }

    var close = function () {
        if (mc !== null) {
            mc.close()
        }
    }

    var isSet = async function (key) {
        const result = await getMcGet()(key)
        return result !== null;
    }

    return {
        isSet: isSet,
        setJson: setJson,
        getJson: getJson,
        close: close,
        set: set,
        get: get,
        init: init
    };
}());
