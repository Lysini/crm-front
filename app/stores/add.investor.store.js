import { observable, action } from "mobx";
import APIs from '@api';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation,
    randomPassword
} from '@utils'

class AddInvestorStore {

    @observable imBusy = false;
    @observable imGettingAdvisors = false;
    @observable imWithError = false;
    @observable gettingAdvisorsWithError = false;
    @observable shouldIFetch = true;
    @observable error = "";
    @observable gettingAdvisorsError = "";
    @observable showSuccessSnackbar = false;
    
    @observable newInvestorForm = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        advisor: {
            firstName: "",
            lastName: "",
            _id: "none"
        },
        description: ""
    }
    @observable newInvestorFormValidation = {
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        phoneError: "",
        advisorError: "",
        descriptionError: ""
    }

    @observable advisorsList = []

    constructor() {
    }

    @action
    changeValue(property, new_value) {
        this[property] = new_value;
    }

    @action
    addInvestor(){
        this.imBusy = true;

        this.newInvestorFormValidation.emailError = emailValidation(this.newInvestorForm.email)
        this.newInvestorFormValidation.firstNameError = nameValidation(this.newInvestorForm.firstName)
        this.newInvestorFormValidation.lastNameError = nameValidation(this.newInvestorForm.lastName)
        this.newInvestorFormValidation.phoneError = phoneValidation(this.newInvestorForm.phone)
        this.newInvestorFormValidation.advisorError = nameValidation(this.newInvestorForm.advisor.firstName + this.newInvestorForm.advisor.lastName)
        this.newInvestorFormValidation.descriptionError = emptyValidation(this.newInvestorForm.description)

        let password = randomPassword()

        if(this.isNewInvestorCorrect()){
            return APIs
            .users
            .sendInvitation(
                this.newInvestorForm.email, 
                password,
                this.newInvestorForm.firstName,
                this.newInvestorForm.lastName,
                this.newInvestorForm.phone,
                this.newInvestorForm.advisor._id
            )
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('sendInvitation success', data);
                this.showSuccessSnackbar = true
                this.clearNewInvestorForm()
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('sendInvitation errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.imBusy = false
        }
    }

    @action
    isNewInvestorCorrect(){
        if(this.newInvestorFormValidation.emailError.length > 0){
            return false
        }
        if(this.newInvestorFormValidation.firstNameError.length > 0){
            return false
        }
        if(this.newInvestorFormValidation.lastNameError.length > 0){
            return false
        }
        if(this.newInvestorFormValidation.phoneError.length > 0){
            return false
        }
        if(this.newInvestorFormValidation.advisorError.length > 0){
            return false
        }
        return true
    }

    @action
    clearNewInvestorForm(){
        this.newInvestorForm = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            advisor: {
                firstName: "",
                lastName: "",
                _id: "none"
            },
            description: ""
        }
    }

    @action
    getAdvisors(){
        this.imGettingAdvisors = true;
        return APIs
        .users
        .getUsers({permission: "admin,worker"})
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getadvisors success', data);
            this.advisorsList = data.data;
            this.shouldIFetch = false;
            this.gettingAdvisorsWithError = false;
            this.imGettingAdvisors = false;
        })
        .catch((errors) => {
            console.log('getadvisors errors', errors);
            this.gettingAdvisorsError = "Nie mogę pobrać niezbędnych danych. Kliknij by spróbować ponownie.";
            this.gettingAdvisorsWithError = true;
            this.imGettingAdvisors = false;
        });
    }
  

}

export default AddInvestorStore;
