import { observable, action } from "mobx";
import APIs from '@api';
import moment from 'moment';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation
} from '@utils'

moment.locale('pl');

class AddEstateStore {

    @observable imBusy = false;
    @observable imWithError = false;
    @observable error = "";
    @observable showSuccessSnackbar = false;
    
    @observable estateDataForm = {
        type: "",
        groundType: "",
        area: "",
        address: "",
        debet: "",
        executionStatus: "Nie podjęto",
        executionStartDate: moment(new Date()),
        description: ""
    };
    @observable estateDataFormValidation = {
        typeError: "",
        groundTypeError: "",
        areaError: "",
        addressError: "",
        debetError: "",
        executionStatusError: "",
        executionStartDateError: "",
        descriptionError: ""
    };


    constructor() {
    }

    @action
    changeValue(property, new_value) {
        this[property] = new_value;
    }

    @action
    getEstateToSend(){
        let _estate = {
            type: this.estateDataForm.type,
            area: this.estateDataForm.area,
            address: this.estateDataForm.address,
            description: this.estateDataForm.description,
        }

        if(this.estateDataForm.type === "Grunt"){
            _estate.groundType = this.estateDataForm.groundType
        }

        if(this.estateDataForm.debet !== ""){
            _estate.debet = this.estateDataForm.debet
            _estate.executionStatus = this.estateDataForm.executionStatus
        }

        if(this.estateDataForm.executionStatus !== "Nie podjęto") {
            _estate.executionStartDate = this.estateDataForm.executionStartDate
        }

        return _estate
    }

    @action
    addEstate(){
        this.imBusy = true;

        if(this.isEstateCorrect()){
            return APIs
            .estates
            .addEstate(this.getEstateToSend())
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('add Estate success', data);
                this.showSuccessSnackbar = true
                this.clearNewEstateForm()
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('add Estate errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.imBusy = false
        }
    }

    @action
    isEstateCorrect(){
        let isCorrect = true

        let typeMessage = emptyValidation(this.estateDataForm.type)
        this.estateDataFormValidation.typeError = typeMessage
        if(typeMessage.length > 0) {
            isCorrect = false
        }

        if(this.estateDataForm.type === "Grunt"){
            let groundTypeMessage = emptyValidation(this.estateDataForm.groundType)
            this.estateDataFormValidation.groundTypeError = groundTypeMessage
            if(groundTypeMessage.length > 0) {
                isCorrect = false
            }
        }

        let areaMessage = emptyValidation(this.estateDataForm.area)
        this.estateDataFormValidation.areaError = areaMessage
        if(areaMessage.length > 0) {
            isCorrect = false
        }

        let addressMessage = emptyValidation(this.estateDataForm.address)
        this.estateDataFormValidation.addressError = addressMessage
        if(addressMessage.length > 0) {
            isCorrect = false
        }

        let debetMessage = ""
        this.estateDataFormValidation.debetError = debetMessage
        if(debetMessage.length > 0) {
            isCorrect = false
        }

        if(this.estateDataForm.debet !== ""){
            let executionStatusMessage = emptyValidation(this.estateDataForm.executionStatus)
            this.estateDataFormValidation.executionStatusError = executionStatusMessage
            if(executionStatusMessage.length > 0) {
                isCorrect = false
            }

            if(this.estateDataForm.executionStatus !== "Nie podjęto") {
            }
        }

        let descriptionMessage = emptyValidation(this.estateDataForm.description)
        this.estateDataFormValidation.descriptionError = descriptionMessage
        if(descriptionMessage.length > 0) {
            isCorrect = false
        }

        return isCorrect
    }

    @action
    clearNewEstateForm(){
        this.estateDataForm = {
            type: "",
            groundType: "",
            area: "",
            address: "",
            debet: "",
            executionStatus: "Nie podjęto",
            executionStartDate: moment(new Date()),
            description: ""
        }
    }
  

}

export default AddEstateStore;
