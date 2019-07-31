const dev_cfg = require('./app/env/dev').dev_config;
const stage_cfg = require('./app/env/stage').stage_config;
// const prod_cfg = require('./app/env/prod').prod_config;
// const test_cfg = require('./app/env/test').test_config;

const config = require('./app/globals/config').config;

const fs = require('fs');

let new_cfg = {}
if (process.argv.includes('--mode')) {
  if (process.argv.includes('dev')) {
    console.log('change env to dev')
    new_cfg = dev_cfg
  }

   if (process.argv.includes('stage')) {
    console.log('change env to stage')
    new_cfg = stage_cfg
  }
  if (process.argv.includes('test')) {
  }
}

const packConfigJSONtoFile = (_config)=>{
    let js_string = 'const config = ' 

    const data = JSON.stringify(_config)

    let js_export = ';\nmodule.exports.config = config;' 

    return js_string + data + js_export
}

fs.writeFileSync('./app/globals/config.js', packConfigJSONtoFile(new_cfg))
