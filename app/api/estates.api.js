import { request } from './common';
const path_to_res = '/estate';


export default class EstatesApi {

    addEstate(estate) {
        return request(path_to_res + `/add`,{
            method:"POST",
            data: estate
        });
    }

    updateEstate(estate, estate_id) {
        return request(path_to_res + `/${estate_id}/update`,{
            method:"PUT",
            data: estate
        });
    }

    getEstates(params = {limit: 100}){
        return request(path_to_res + '',{
            method:"GET",
            query: params
        });
    }

}
