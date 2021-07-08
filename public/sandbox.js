const lib_templates = require('./../service/templates.js');
const lib_state_home = require('./../state/home.js');
const mc = require('./../persistence/memcahed.js');


//lib_state_home.setEnvs('intDE')
//var a = lib_state_home.getEnvs()

// lib_state_home.cacheReservedTime('intDE', 'alex','11:00')
// lib_state_home.addReservedTime('intDE')
// lib_state_home.cacheReservedTime('intDE', 'alex','12:00')
// lib_state_home.addReservedTime('intDE')
// lib_state_home.removeReservedTime('intDE','12:00')
//let a = lib_state_home.getReservedTimes('intDE')

//var a = lib_templates('modal/schedule', lib_state_home.getEnv('intDE'))

//console.log(lib_state_home.getReservedTimes('intDE'));

//a = lib_state_home.getReservedTimes('intDE')


(async () => {

})()



mc.setJson('message', {a: 'b', c: {d: 'e'}})

if ( mc.isSet('message')){
    a =  mc.getJson('message')
    console.log(a);
}

mc.close()
