import { observable, action } from "mobx";
import APIs from '@api';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation
} from '@utils'

const filtersPattern = {
    search: "",
    permission: "investor",
    sortByColumn: "createdAt",
    sortingDirection: "-1",
    minCreatedDate: "",
    maxCreatedDate: "",
    page: 0
}

class InvestorsListStore {

    @observable imBusy = false;
    @observable imWithError = false;
    @observable error = "";
    @observable shouldIFetch = true;
    
    @observable showFilters = false;
    @observable filters = { ...filtersPattern };
    @observable isAnyFilter = false;

    @observable investors = [];
    @observable totalCount = 0;

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
        this.getInvestors()
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
        this.getInvestors()
    }

    @action
    changePage(newPage){
        this.filters.page = newPage
        this.getInvestors()
    }


    @action
    getInvestors(){
        this.imBusy = true;

        return APIs
        .users
        .getUsers(this.getFilters())
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getInvestors success', data);
            this.investors = data.data;
            this.shouldIFetch = false;
            this.totalCount = data.totalCount
            this.imWithError = false;
            this.imBusy = false;
            this.isAnyFilter = this.checkIfAnyFilterChanged()
        })
        .catch((errors) => {
            console.log('getInvestors errors', errors);
            this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithError = true;
            this.imBusy = false;
        });
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

}

export default InvestorsListStore;
