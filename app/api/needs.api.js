import { request } from './common';
const path_to_res = '/needs';


export default class NeedsApi {

    sendNeed(problem) {
        return request(path_to_res + '/add',{
            method:"POST",
            data: problem,
            multipart: true
        });
    }

    getNeeds(params = {limit: 100}){
        return request(path_to_res + '',{
            method:"GET",
            query: params
        });
    }

}
