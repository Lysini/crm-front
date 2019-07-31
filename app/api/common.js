import axios from 'axios';
import querystring from 'query-string'
const config = require('../globals/config').config
const {baseUrl, apiUrl} = config;

const DEBUG = true;

const instance = axios.create({
    baseURL: baseUrl+apiUrl,
    // timeout: 60000,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

instance.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.put['Content-Type'] = 'application/json';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
instance.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';

const logger = (data, url) => {
    DEBUG && console.log(url, `\n\t status: ${data.status}`, `\n\t payload: `, data.data)
    return data.data
}
 
export const request = (_url, _config = {}) => {
    DEBUG && console.log(_url, 'config', _config);
    let req = {
        url: _url,
        ..._config
    }
    if (!req.headers) {
        req.headers = {}
    }
    if(_config.multipart){
        req.headers['content-type'] = 'multipart/form-data'
    }

    if(_config.query && Object.keys(_config.query).length !== 0){
        let _query = {}
        for(const param in _config.query){
            if(["", 0].indexOf(_config.query[param])){
                _query[param] = _config.query[param]
            }
        }
        req.url += '?'+querystring.stringify(_query)
    }
    return instance
        .request(req)
        .then((data) => {
            return logger(data, _url);
        })

}


export const stringifyParams = (params) => {
    var paramsString = ""
    Object.keys(myObject).map(function(key, index) {
        myObject[key] *= 2;
    });
    for(const param in params){
        if(["", 0].indefOf(param) === -1){
            paramsString += `?${param}=${params[param]}`
        }
    }
    return paramsString
}