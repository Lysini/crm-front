import { observable, action } from "mobx";
import APIs from '@api';


const filtersPattern = {
    search: "",
    sortByColumn: "createdAt",
    sortingDirection: "-1",
    minCreatedDate: "",
    maxCreatedDate: "",
    minReportedDay: "",
    maxReportedDay: "",
    page: 0,
    statusNotEqual: "incompleted"
}

class reportsListForAdminStore {

    @observable imBusy = false;
    @observable imWithError = false;
    @observable error = "";
    @observable shouldIFetch = true;

    @observable filters = {...filtersPattern};
    @observable isAnyFilter = false;
    
    @observable showFilters = false;
    @observable reports = [];
    @observable totalCount = 0;

    @observable reportToDetails = {
        worker: {
            firstName: "",
            lastName: ""
        },
        reportedDay: new Date()
    };
    @observable showReportDetails = false;

    @observable imBusyChangingStatus = {
        accepted: false,
        rejected: false
    };
    @observable imWithErrorChangingStatus = false;
    @observable errorChangingStatus = "";

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

        if(this.filters.minReportedDay && !_filters.minReportedDay._isValid){
            _filters.minReportedDay = ""
        }
        if(this.filters.maxReminReportedDay && !_filters.maxReminReportedDay._isValid){
            _filters.maxReminReportedDay = ""
        }
        
        return _filters
    }

    @action
    clearFilters(){
        this.filters = {...filtersPattern}
        this.getReports()
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
        this.getReports()
    }

    @action
    changePage(newPage){
        this.filters.page = newPage
        this.getReports()
    }

    @action
    getReports(){
        this.imBusy = true;

        return APIs
        .reports
        .getReports(this.getFilters())
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getReports success', data);
            this.reports = data.data;
            this.totalCount = data.totalCount
            this.shouldIFetch = false;
            this.imWithError = false;
            this.imBusy = false;
            this.isAnyFilter = this.checkIfAnyFilterChanged()
        })
        .catch((errors) => {
            console.log('getReports errors', errors);
            this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithError = true;
            this.imBusy = false;
        });
    }

    @action
    checkIfAnyFilterChanged(){
        for(const filter_prop in this.filters){
            if(filter_prop === "minCreatedDate" || filter_prop === "maxCreatedDate" || filter_prop === "minReportedDay" || filter_prop === "maxReportedDay"){
                if(this.filters.minCreatedDate && this.filters.minCreatedDate._isValid){
                    return true
                }
                if(this.filters.maxCreatedDate && this.filters.maxCreatedDate._isValid){
                    return true
                }
                if(this.filters.minReportedDay && this.filters.minReportedDay._isValid){
                    return true
                }
                if(this.filters.maxReportedDay && this.filters.maxReportedDay._isValid){
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
    toggleDetailsModal(report){
        this.reportToDetails = {...report}
        this.showReportDetails = true
    }

    @action
    changeReportStatus(status){
        this.imBusyChangingStatus[status] = true
        return APIs
        .reports
        .changeReportStatus(this.reportToDetails._id, status)
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('getReports success', data);
            this.updateInList(data.data)
            this.imWithErrorChangingStatus = false;
            this.imBusyChangingStatus[status] = false;
            this.showReportDetails = false
        })
        .catch((errors) => {
            console.log('getReports errors', errors);
            this.errorChangingStatus = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithErrorChangingStatus = true;
            this.imBusyChangingStatus[status] = false;
        });
    }

    @action
    updateInList(updatedReport){
        let _reports = this.reports.map((report) => {
            if(updatedReport._id === report._id){
                return updatedReport
            } else {
                return report
            }
        })
        this.reports = _reports
    }

}

export default reportsListForAdminStore;
