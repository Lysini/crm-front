import { observable, action, toJS } from "mobx";
import APIs from '@api';
import moment from 'moment';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation,
    nipValidation
} from '@utils'

moment.locale('pl');

class SendProblemStore {

    @observable imBusy = false;
    @observable currentView = "info"

    @observable stepsError = "";
    @observable problemSearch = "";
    @observable problem = {
        problemType: {
            label: "",
            type: ""
        },
        problemDescription: ""
    }
    
    @observable problemValidation = {
        problemTypeError: "",
        problemDescriptionError: ""
    };

    @observable contactDataForm = {
        fullName: "",
        email: "",
        phone: ""
    };

    @observable contactDataFormValidation = {
        fullNameError: "",
        emailError: "",
        phoneError: ""
    };

    @observable firmDataForm = {
        nip: ""
    };
    @observable firmDataFormValidation = {
        nipError: ""
    };

    @observable bikFile = {};
    @observable bikFileError = "";

    @observable businessPlanFile = {};
    @observable businessPlanFileError = "";

    @observable estateDataForm = {
        type: "",
        groundType: "",
        area: "",
        address: "",
        debet: "",
        executionStatus: "Nie podjęto",
        executionStartDate: moment(new Date())
    };
    @observable estateDataFormValidation = {
        typeError: "",
        groundTypeError: "",
        areaError: "",
        addressError: "",
        debetError: "",
        executionStatusError: "",
        executionStartDateError: ""
    };

    constructor() {
    }

    @action
    changeValue(property, new_value) {
        this[property] = new_value;
    }

    @action
    dropFile(file, property){
        let splited_file = file.name.split('.');
        if (splited_file.length > 1) {
            if (["pdf"].indexOf(splited_file[splited_file.length - 1].toLowerCase()) !== -1) {
                this[`${property}File`] = file
            } else {
                alert(`Nieprawidłowe rozszerzenie, akceptujemy tylko pliki pdf.`);
            }
        }
    }

    @action
    sendProblem(clearSteps){
        this.imBusy = true;

        if(this.isProblemCorrect()){
            let problemToSend = this.getProblemToSend()
            return APIs
            .needs
            .sendNeed(problemToSend)
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('sendNeed success', data);
                this.imWithError = false;
                this.imBusy = false;
                this.currentView = "send_success"
                this.clearProblemForm()
                clearSteps()
            })
            .catch((errors) => {
                console.log('sendNeed errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
        this.imBusy = false
        this.imWithError = true;
        this.error = "Uzupełnij formularz poprawnie."
        }
    }

    @action
    getProblemToSend(){
        var _problem = new FormData();
        
        _problem.append("type", this.problem.problemType.label);
        _problem.append("description", this.problem.problemDescription);

        _problem.append("fullName", this.contactDataForm.fullName)
        _problem.append("email", this.contactDataForm.email)
        _problem.append("phoneNumber", this.contactDataForm.phone)

        if(this.firmDataForm.nip.length > 0) {
            _problem.append("nip", this.firmDataForm.nip);
        }

        if(this.problem.problemType.type === "credit"){
            _problem.append("file", this.bikFile);
        }

        if(this.problem.problemType.type === "offer"){
            _problem.append("file", this.businessPlanFile);
        }
        
        if(this.problem.problemType.type === "estate"){
            _problem.append("estateType", this.estateDataForm.type)
            _problem.append("estateGroundType", this.estateDataForm.groundType)
            _problem.append("estateArea", this.estateDataForm.area)
            _problem.append("estateAddress", this.estateDataForm.address)
            _problem.append("estateDebet", this.estateDataForm.debet)
            _problem.append("estateExecutionStatus", this.estateDataForm.executionStatus)
            _problem.append("estateExecutionStartDate", this.estateDataForm.executionStartDate)
        }

        return _problem
    }

    @action
    isProblemCorrect(){
        let isCorrect = true;

        let problemTypeValidation = emptyValidation(this.problem.problemType.label)
        this.problemValidation.problemTypeError = problemTypeValidation;
        if(problemTypeValidation.length > 0){
            isCorrect = false;
        }

        let problemDescriptionValidation = emptyValidation(this.problem.problemDescription)
        this.problemValidation.problemDescriptionError = problemDescriptionValidation;
        if(problemDescriptionValidation.length > 0){
            isCorrect = false;
        }

        if(this.problem.problemType.type === "credit"){
            if(!this.isBIKFileCorrect()){
                isCorrect = false
            }

            if(!this.isContactFormCorrect()){
                isCorrect = false
            }

            if(!this.isNIPCorrect()){
                isCorrect = false
            }
        }

        if(this.problem.problemType.type === "offer"){
            if(!this.isBusinessPlanFileCorrect()){
                isCorrect = false
            }

            if(!this.isContactFormCorrect()){
                isCorrect = false
            }
        }

        if(this.problem.problemType.type === "estate"){
            if(!this.isEstateCorrect()){
                isCorrect = false
            }

            if(!this.isContactFormCorrect()){
                isCorrect = false
            }
        }

        return isCorrect
    }

    @action
    isBIKFileCorrect(){
        let message = ""
        if(!this.bikFile.name){
            message = "Plik z BIK jest wymagany."
        }

        this.bikFileError = message
        return message.length === 0
    }

    @action
    isBusinessPlanFileCorrect(){
        let message = ""
        if(!this.businessPlanFile.name){
            message = "Plik z biznesplanem jest wymagany."
        }

        this.businessPlanFileError = message
        return message.length === 0
    }

    @action
    isContactFormCorrect(){
        let isCorrect = true

        let fullNameError = nameValidation(this.contactDataForm.fullName)
        this.contactDataFormValidation.fullNameError = fullNameError
        if(fullNameError.length > 0){
            isCorrect = false
        }

        let emailError = emailValidation(this.contactDataForm.email)
        this.contactDataFormValidation.emailError = emailError
        if(emailError.length > 0){
            isCorrect = false
        }

        let phoneError = phoneValidation(this.contactDataForm.phone)
        this.contactDataFormValidation.phoneError = phoneError
        if(phoneError.length > 0){
            isCorrect = false
        }

        return isCorrect
    }

    @action
    isNIPCorrect(){
        let message = ""
        this.firmDataFormValidation.nipError = nipValidation(this.firmDataForm.nip)

        return message.length === 0
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

        return isCorrect
    }

    @action
    clearProblemForm(){
        this.problem = {
            problemType: {
                label: "",
                type: ""
            },
            problemDescription: ""
        }

        this.contactDataForm = {
            fullName: "",
            email: "",
            phone: ""
        };

        this.firmDataForm = {
            nip: "NIP"
        };

        this.bikFile = {}
        this.businessPlanFile = {}
        
        this.estateDataForm = {
            type: "",
            groundType: "",
            area: "",
            address: "",
            debet: "",
            executionStatus: "Nie podjęto",
            executionStartDate: moment(new Date())
        }
    }
  

}

export default SendProblemStore;