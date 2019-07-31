import { observable, action } from "mobx";
import APIs from '@api';
import moment from 'moment';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation
} from '@utils'

const filtersPattern = {
    search: "",
    sortByColumn: "createdAt",
    sortingDirection: "-1",
    advisor: "",
    minCreatedDate: "",
    maxCreatedDate: "",
    page: 0
}

moment.locale('pl');

class BusinessInvestmentsListStore {

    @observable imBusy = false;
    @observable imBusyUpdatingInvestment = false;
    @observable imWithError = false;
    @observable updatingInvestmentWithError = false;
    @observable error = "";
    @observable updateInvestmentError = "";
    @observable shouldIFetch = true;
    @observable showSuccessSnackbar = false;

    @observable filters = {...filtersPattern};
    @observable isAnyFilter = false;
    
    @observable showFilters = false;
    @observable investments = [];
    @observable totalCount = 0;

    @observable showEditModal = false;
    @observable investmentToEdit = {}
    @observable investmentToEditValidation = {
        investorError: "",
        valueError: "",
        advisorError: "",
        conditionsError: "",
        fileError: ""
    }

    @observable imGettingAdvisors = false;
    @observable imGettingInvestors = false;
    @observable gettingAdvisorsWithError = false;
    @observable gettingInvestorsWithError = false;
    @observable shouldIFetchAdvisors = true;
    @observable shouldIFetchInvestors = true;
    @observable gettingAdvisorsError = "";
    @observable gettingInvestorsError = "";

    @observable businessPlanFile = {};
    @observable businessPlanFileError = "";

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
    toggleFilterbar() {
        this.showFilters = !this.showFilters;
    }

    @action
    checkIfAnyFilterChanged(){
        for(const filter_prop in this.filters){
            if(filter_prop === "minCreatedDate" || filter_prop === "maxCreatedDate"){
                if(this.filters.minCreatedDate && this.filters.minCreatedDate._isValid){
                    return true
                }
                if(this.filters.maxCreatedDate && this.filters.maxCreatedDate._isValid){
                    return true
                }
            } else {
                if(this.filters[filter_prop] !== filtersPattern[filter_prop]){
                    return true
                }
            }
            
        }
        return false
    }

    @action
    getFilters(){
        let _filters = {...this.filters}
        if(this.filters.minCreatedDate && !_filters.minCreatedDate._isValid){
            _filters.minCreatedDate = ""
        }
        if(this.filters.maxCreatedDate && !_filters.maxCreatedDate._isValid){
            _filters.maxCreatedDate = ""
        }  
        return _filters
    }

    @action
    clearFilters(){
        this.filters = {...filtersPattern}
        this.getInvestments()
    }

    @action
    changeSort(choosedColumn){
        if(choosedColumn === this.filters.sortByColumn){
            this.filters.sortingDirection *= -1
        } else {
            this.filters.sortByColumn = choosedColumn
            this.filters.sortingDirection = -1
        }
        this.changePage(0)
        this.getInvestments()
    }

    @action
    changePage(newPage){
        this.filters.page = newPage
        this.getInvestments()
    }

    @action
    getInvestments(){
        this.imBusy = true;

        return APIs
        .investments
        .getInvestments(this.getFilters())
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getInvestments success', data);
            this.investments = data.data;
            this.totalCount = data.totalCount
            this.shouldIFetch = false;
            this.imWithError = false;
            this.imBusy = false;
            this.isAnyFilter = this.checkIfAnyFilterChanged()
        })
        .catch((errors) => {
            console.log('getInvestments errors', errors);
            this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithError = true;
            this.imBusy = false;
        });
    }

    @action
    toggleEditModal(investment){
        let _investment = {...investment}
        if(!_investment.advisor){
            _investment.advisor = {_id: ""}
        }
        if(!_investment.investor){
            _investment.investor = {_id: ""}
        }
        this.investmentToEdit = {..._investment}
        this.showEditModal = true
    }

    updateInvestment(){
        this.imBusyUpdatingInvestment = true;

        if(this.isBusinessInvestmentCorrect()){
            this.imBusyUpdatingInvestment = false
            return APIs
            .investments
            .updateInvestment(this.getBusinessInvestmentToSend(), this.investmentToEdit._id)
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('update Investment success', data);
                this.updateInList(data.data)
                this.showSuccessSnackbar = true
                this.updatingInvestmentWithError = false;
                this.imBusyUpdatingInvestment = false;
                this.showEditModal = false
            })
            .catch((errors) => {
                console.log('update Investment errors', errors);
                this.updateInvestmentError = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.updatingInvestmentWithError = true;
                this.imBusyUpdatingInvestment = false;
            });
        } else {
            this.imBusyUpdatingInvestment = false
        }
    }

    @action
    updateInList(updatedInvestment){
        let _investments = this.investments.map((investment) => {
            if(updatedInvestment._id === investment._id){
                return updatedInvestment
            } else {
                return investment
            }
        })
        this.investments = _investments
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
        _businessInvestment.append("investor", this.investmentToEdit.investor._id);
        _businessInvestment.append("advisor", this.investmentToEdit.advisor._id);
        _businessInvestment.append("value", this.investmentToEdit.value);
        _businessInvestment.append("conditions", this.investmentToEdit.conditions);
        if(this.businessPlanFile.name){
            _businessInvestment.append("file", this.businessPlanFile);
        } else {
        }
        return _businessInvestment
    }

    @action
    isBusinessInvestmentCorrect(){
        let isCorrect = true

        let valueMessage = ""
        if(this.investmentToEdit.value === "" || Number(this.investmentToEdit.value) <= 0){
            valueMessage = "Musisz wpisać prawidłową kwotę."
            isCorrect = false
        }
        this.investmentToEditValidation.valueError = valueMessage

        let conditionsMessage = emptyValidation(this.investmentToEdit.conditions)
        this.investmentToEditValidation.conditionsError = conditionsMessage
        if(conditionsMessage.length > 0) {
            isCorrect = false
        }

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
  

}

export default BusinessInvestmentsListStore;
