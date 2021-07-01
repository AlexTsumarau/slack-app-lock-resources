require('dotenv').config()
const memjs = require('memjs');
const {promisify} = require('util');

module.exports = (function () {
    'use strict';

    var mc = memjs.Client.create(
        process.env.memcached_host,
        {
            username: process.env.memcached_user,
            password: process.env.memcached_pass
        });

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
        mc.close()
    }

    var isSet = async function (key) {
        const result = await getMcGet()(key)
        return result !== null;
    }

    return {
        isSet: isSet,
        setJson: setJson,
        getJson: getJson,
        close: close
    };
}());
