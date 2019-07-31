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

class AddBusinessInvestmentStore {

    @observable imBusy = false;
    @observable imGettingAdvisors = false;
    @observable imGettingInvestors = false;
    @observable imWithError = false;
    @observable gettingAdvisorsWithError = false;
    @observable gettingInvestorsWithError = false;
    @observable shouldIFetchAdvisors = true;
    @observable shouldIFetchInvestors = true;
    @observable error = "";
    @observable gettingAdvisorsError = "";
    @observable gettingInvestorsError = "";
    @observable showSuccessSnackbar = false;
    
    @observable businessInvestmentForm = {
        value: "",
        investor: {_id: ""},
        advisor: {_id: ""},
        conditions: ""
    };

    @observable businessPlanFile = {};
    @observable businessPlanFileError = "";

    @observable businessInvestmentFormValidation = {
        valueError: "",
        investorError: "",
        advisorError: "",
        conditionsError: ""
    };

    @observable investorsFilters = {
        search: "",
        limit: 25,
        page: 0,
        permission: "investor",
    };
    @observable advisorsList = [];
    @observable investorsList = [];
    @observable totalInvestors = 0;

    constructor() {
    }

    @action
    changeValue(property, new_value) {
        this[property] = new_value;
    }

    @action
    dropFile(file){
        let splited_file = file.name.split('.');
        if (splited_file.length > 1) {
            if (["pdf"].indexOf(splited_file[splited_file.length - 1].toLowerCase()) !== -1) {
                this.businessPlanFile = file
            } else {
                alert(`Nieprawidłowe rozszerzenie, akceptujemy tylko pliki pdf.`);
            }
        }
    }

    @action
    getBusinessInvestmentToSend(){
        var _businessInvestment = new FormData();
        _businessInvestment.append("investor", this.businessInvestmentForm.investor._id);
        _businessInvestment.append("advisor", this.businessInvestmentForm.advisor._id);
        _businessInvestment.append("value", this.businessInvestmentForm.value);
        _businessInvestment.append("conditions", this.businessInvestmentForm.conditions);
        _businessInvestment.append("file", this.businessPlanFile);
        return _businessInvestment
    }

    @action
    changePage(newPage){
        this.investorsFilters.page = newPage
        this.getInvestors()
    }

    @action
    addBusinessInvestment(){
        this.imBusy = true;

        if(this.isBusinessInvestmentCorrect()){
            return APIs
            .investments
            .addInvestment(this.getBusinessInvestmentToSend())
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('add BusinessInvestment success', data);
                this.showSuccessSnackbar = true
                this.clearNewBusinessInvestmentForm()
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('add BusinessInvestment errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.imBusy = false
        }
    }

    @action
    isBusinessInvestmentCorrect(){
        let isCorrect = true

        let investorMessage = ""
        if(!this.businessInvestmentForm.investor._id){
            investorMessage = "Musisz wybrać inwestora."
            isCorrect = false
        }
        this.businessInvestmentFormValidation.investorError = investorMessage

        let valueMessage = ""
        if(this.businessInvestmentForm.value === "" || Number(this.businessInvestmentForm.value) <= 0){
            valueMessage = "Musisz wpisać prawidłową kwotę."
            isCorrect = false
        }
        this.businessInvestmentFormValidation.valueError = valueMessage

        let advisorMessage = ""
        if(!this.businessInvestmentForm.advisor._id){
            advisorMessage = "Musisz wybrać opiekuna inwestycji."
            isCorrect = false
        }
        this.businessInvestmentFormValidation.advisorError = advisorMessage

        let conditionsMessage = emptyValidation(this.businessInvestmentForm.conditions)
        this.businessInvestmentFormValidation.conditionsError = conditionsMessage
        if(conditionsMessage.length > 0) {
            isCorrect = false
        }

        let fileMessage = ""
        if(!this.businessPlanFile.name){
            fileMessage = "Plik z biznesplanem jest wymagany."
            isCorrect = false
        }
        this.businessPlanFileError = fileMessage

        return isCorrect
    }

    @action
    getAdvisors(){
        this.getUsers(
            {
                permission: "admin,worker"
            },
            "Advisor"
        )
    }

    @action
    getInvestors(){
        this.getUsers(
            {...this.investorsFilters},
            "Investor"
        )
    }

    @action
    getUsers(filters, userType){
        this[`imGetting${userType}s`] = true;
        return APIs
        .users
        .getUsers(filters)
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log(`get ${userType}s success`, data);
            this[`${userType.toLowerCase()}sList`] = data.data;
            this[`shouldIFetch${userType}s`] = false;
            this[`getting${userType}sWithError`] = false;
            this[`imGetting${userType}s`] = false;
            this[`total${userType}s`] = data.totalCount
        })
        .catch((errors) => {
            console.log(`get ${userType}s error`, errors);
            this[`getting${userType}sError`] = "Nie mogę pobrać niezbędnych danych. Kliknij by spróbować ponownie.";
            this[`getting${userType}sWithError`] = true;
            this[`imGetting${userType}s`] = false;
        });
    }

    @action
    clearNewBusinessInvestmentForm(){
        this.businessInvestmentForm = {
            value: "",
            investor: {_id: ""},
            advisor: {_id: ""},
            conditions: ""
        }
        this.businessPlanFile = {}
    }
  

}

export default AddBusinessInvestmentStore;
