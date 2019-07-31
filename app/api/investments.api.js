import { request } from './common';
const path_to_res = '/investment';


export default class InvestmentsApi {

    addInvestment(investment) {
        return request(path_to_res + `/add`,{
            method:"POST",
            data: investment,
            multipart: true
        });
    }

    updateInvestment(investment, investment_id) {
        return request(path_to_res + `/${investment_id}/update`,{
            method:"PUT",
            data: investment,
            multipart: true
        });
    }

    getInvestments(params = {limit: 100}){
        return request(path_to_res + '',{
            method:"GET",
            query: params
        });
    }

}
