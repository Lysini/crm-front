import { request, stringifyParams } from './common';
const path_to_res = '/users';


export default class UsersApi {

    getUsers(params = {limit: 100}) {
        return request(path_to_res + ``,{
            method: "GET",
            query: params
        });
    }

    login(email, password) {
        return request(path_to_res + '/login',{
            method:"POST",
            data: {
                email: email,
                password: password
            }
        });
    }

    sendInvitation(email, password, firstName, lastName, phoneNumber, advisor_id){
        return request(path_to_res + '/invite-investor',{
            method:"POST",
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                advisor: advisor_id
            }
        });
    }

    remindPassword(email) {
        return request(path_to_res + '/login',{
            method:"POST",
            data: {
                email: email
            }
        });
    }

}
