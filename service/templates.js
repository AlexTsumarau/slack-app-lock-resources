const lib_fs = require('fs');
const lib_mustache = require('mustache');

module.exports = function (path, params) {
    switch (path) {
        case 'home/row':
            let arrayOfArraysToConcat = params.map(envItem => {
                const template = lib_fs.readFileSync('templates/' + path + '/' + envItem.status + '.json').toString();
                let str = lib_mustache.render(template.toString(), envItem)
                return JSON.parse(str)
            })
            return Array.prototype.concat.apply([], arrayOfArraysToConcat);
            break
        case 'modal/schedule':
            const template = lib_fs.readFileSync('templates/' + path + '.json').toString();
            const templateTime = lib_fs.readFileSync('templates/' + path + '/time.json').toString();
            let parsedTemplate = lib_mustache.render(template.toString(), params)
            let result = JSON.parse(parsedTemplate)
            if (params.schedule) {
                let timeBlocks = params.schedule.map(schedItem => {
                    let strTime = lib_mustache.render(templateTime.toString(), schedItem)
                    return JSON.parse(strTime)
                })
                result.blocks = result.blocks.concat.apply(result.blocks, timeBlocks)
            }
            return result
            break
    }

}
