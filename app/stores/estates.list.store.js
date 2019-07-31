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
    type: "",
    groundType: "",
    executionStatus: "",
    minExecutionStartedDate: "",
    maxExecutionStartedDate: "",
    minCreatedDate: "",
    maxCreatedDate: "",
    page: 0
}

moment.locale('pl');

class EstatesListStore {

    @observable imBusy = false;
    @observable imBusyUpdatingEstate = false;
    @observable imWithError = false;
    @observable updatingEstateWithError = false;
    @observable error = "";
    @observable updateEstateError = "";
    @observable shouldIFetch = true;
    @observable showSuccessSnackbar = false;

    @observable filters = {...filtersPattern};
    @observable isAnyFilter = false;
    
    @observable showFilters = false;
    @observable estates = [];
    @observable totalCount = 0;

    @observable showEditModal = false;
    @observable estateToEdit = {}
    @observable estateToEditValidation = {
        typeError: "",
        groundTypeError: "",
        areaError: "",
        addressError: "",
        debetError: "",
        executionStatusError: "",
        executionStartDateError: "",
        descriptionError: ""
    }

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

        if(this.filters.minExecutionStartedDate && !_filters.minExecutionStartedDate._isValid){
            _filters.minExecutionStartedDate = ""
        }
        if(this.filters.maxExecutionStartedDate && !_filters.maxExecutionStartedDate._isValid){
            _filters.maxExecutionStartedDate = ""
        }
        
        return _filters
    }

    @action
    clearFilters(){
        this.filters = {...filtersPattern}
        this.getEstates()
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
        this.getEstates()
    }

    @action
    changePage(newPage){
        this.filters.page = newPage
        this.getEstates()
    }

    @action
    getEstates(){
        this.imBusy = true;

        return APIs
        .estates
        .getEstates(this.getFilters())
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getEstates success', data);
            this.estates = data.data;
            this.totalCount = data.totalCount
            this.shouldIFetch = false;
            this.imWithError = false;
            this.imBusy = false;
            this.isAnyFilter = this.checkIfAnyFilterChanged()
        })
        .catch((errors) => {
            console.log('getEstates errors', errors);
            this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithError = true;
            this.imBusy = false;
        });
    }

    @action
    toggleEditModal(estate){
        this.estateToEdit = {...estate}
        this.showEditModal = true
    }

    updateEstate(){
        this.imBusyUpdatingEstate = true;

        if(this.isEstateCorrect()){
            this.imBusyUpdatingEstate = false
            return APIs
            .estates
            .updateEstate(this.getEstateToSend(), this.estateToEdit._id)
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('update Estate success', data);
                this.updateInList(data.data)
                this.showSuccessSnackbar = true
                this.updatingEstateWithError = false;
                this.imBusyUpdatingEstate = false;
                this.showEditModal = false
            })
            .catch((errors) => {
                console.log('update Estate errors', errors);
                this.updateEstateError = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.updatingEstateWithError = true;
                this.imBusyUpdatingEstate = false;
            });
        } else {
            this.imBusyUpdatingEstate = false
        }
    }

    @action
    updateInList(updatedEstate){
        let _estates = this.estates.map((estate) => {
            if(updatedEstate._id === estate._id){
                return updatedEstate
            } else {
                return estate
            }
        })
        this.estates = _estates
    }

    @action
    getEstateToSend(){
        let _estate = {
            type: this.estateToEdit.type,
            area: this.estateToEdit.area,
            address: this.estateToEdit.address,
            description: this.estateToEdit.description,
        }

        if(this.estateToEdit.type === "Grunt"){
            _estate.groundType = this.estateToEdit.groundType
        }

        if(this.estateToEdit.debet !== ""){
            _estate.debet = this.estateToEdit.debet
            _estate.executionStatus = this.estateToEdit.executionStatus
        }

        if(this.estateToEdit.executionStatus !== "Nie podjęto" && this.estateToEdit.debet !== "") {
            _estate.executionStartDate = this.estateToEdit.executionStartDate
        }

        return _estate
    }

    @action
    isEstateCorrect(){
        let isCorrect = true

        let typeMessage = emptyValidation(this.estateToEdit.type)
        this.estateToEditValidation.typeError = typeMessage
        if(typeMessage.length > 0) {
            isCorrect = false
        }

        if(this.estateToEdit.type === "Grunt"){
            let groundTypeMessage = emptyValidation(this.estateToEdit.groundType)
            this.estateToEditValidation.groundTypeError = groundTypeMessage
            if(groundTypeMessage.length > 0) {
                isCorrect = false
            }
        }

        let areaMessage = emptyValidation(this.estateToEdit.area)
        this.estateToEditValidation.areaError = areaMessage
        if(areaMessage.length > 0) {
            isCorrect = false
        }

        let addressMessage = emptyValidation(this.estateToEdit.address)
        this.estateToEditValidation.addressError = addressMessage
        if(addressMessage.length > 0) {
            isCorrect = false
        }

        let debetMessage = ""
        this.estateToEditValidation.debetError = debetMessage
        if(debetMessage.length > 0) {
            isCorrect = false
        }

        if(this.estateToEdit.debet !== ""){
            let executionStatusMessage = emptyValidation(this.estateToEdit.executionStatus)
            this.estateToEditValidation.executionStatusError = executionStatusMessage
            if(executionStatusMessage.length > 0) {
                isCorrect = false
            }

            if(this.estateToEdit.executionStatus !== "Nie podjęto") {
            }
        }

        let descriptionMessage = emptyValidation(this.estateToEdit.description)
        this.estateToEditValidation.descriptionError = descriptionMessage
        if(descriptionMessage.length > 0) {
            isCorrect = false
        }

        return isCorrect
    }
  

}

export default EstatesListStore;
