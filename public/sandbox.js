const lib_templates = require('./../service/templates.js');
const stateHome = require('./../state/home.js');
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


let f = async () => {
    let x
    await stateHome.init()
    await stateHome.getEnvs()
    console.log(x)
    console.log('end')
    // let list = stateHome.getEnvs().map(e => {
    //     return e.name + ': ' + (e.user === null ? 'free' : 'used by ' + e.user + ', also waiting: ' + e.queue)
    // })
    // console.log(list)
    mc.close()
}

f()


//mc.setJson('message', {a: 'b', c: {d: 'e'}})

// if ( mc.isSet('message')){
//     a =  mc.getJson('message')
//     console.log(a);
// }

//a = mc.get();

//mc.close()
