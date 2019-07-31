import { observable, action } from "mobx";
import APIs from '@api';

class AdvisorProfileStore {

    @observable imBusy = false;
    @observable shouldIFetch = true;
    @observable imWithError = false;
    @observable error = "";
    @observable advisor = null;
    @observable noAdvisor = false

    constructor() {
    }

    @action
    getAdvisor(){
        
        let advisorId = JSON.parse(localStorage.getItem("authData")).advisor
        if(advisorId){
            this.imBusy = true;
            return APIs
            .users
            .getUsers({id: advisorId})
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('get user advisor success', data);
                this.advisor = data.data;
                this.shouldIFetch = false;
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('get user advisor errors', errors);
                this.error = "Nie udało się pobrać danych opiekuna. Kliknij by spróbować ponownie.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.noAdvisor = true
        }
        
    }

}

export default AdvisorProfileStore;
