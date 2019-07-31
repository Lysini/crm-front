import { observable, action, toJS } from "mobx";
import APIs from '@api';
import moment from 'moment';

import {
    emptyValidation,
    emailValidation,
    phoneValidation,
    nameValidation
} from '@utils'

moment.locale('pl');

const getNewAction = (type) => {
    return{
        actionType: type,
        description: ""
    }
}

const actionValidationPattern = {
    actionTypeError: "",
    descriptionError: ""
}

class AddReportStore {

    @observable imBusy = false;
    @observable imWithError = false;
    @observable error = "";
    @observable showSuccessSnackbar = false;
    @observable successSnackbarMessage = "";

    @observable imBusyCheckingIfDayReported = false;
    @observable imWithErrorCheckingIfDayReported = false;
    @observable checkingIfDayReportedError = "";
    @observable shouldCheckIfDayIsReported = true;
    @observable isDayReported = false;

    @observable newAction = {
        actionType: ""
    }
    @observable newActionValidation = {
        actionTypeError: ""
    }
    
    @observable reportForm = {
        reportedDay: moment(new Date()),
        actions: []
    };
    @observable reportFormValidation = {
        reportedDayError: "",
        actionsErrors: []
    };


    constructor() {
    }

    @action
    changeValue(property, new_value) {
        this[property] = new_value;
    }

    @action
    changeReportedDate(newDate){
        if(!moment(newDate).isSame(this.reportForm.reportedDay, 'day')){
            this.reportForm.reportedDay = newDate
            this.checkIfDayIsReported()
        }
    }

    @action
    addNewAction(){
        if(this.newAction.actionType === ""){
            this.newActionValidation.actionTypeError = "Wybierz akcje która została wykonana."
        } else {
            this.reportForm.actions = [...this.reportForm.actions, {...getNewAction(this.newAction.actionType)}]
            this.reportFormValidation.actionsErrors = [...this.reportFormValidation.actionsErrors, {...actionValidationPattern}]

            this.newAction.actionType = ""
            this.newActionValidation.actionTypeError = ""
        }
        
    }

    @action
    deleteAction(index){
        this.reportForm.actions = [
            ...this.reportForm.actions.slice(0, index), 
            ...this.reportForm.actions.slice(index+1, ...this.reportForm.actions.length)
        ]
        this.reportFormValidation.actionsErrors = [
            ...this.reportFormValidation.actionsErrors.slice(0, index), 
            ...this.reportFormValidation.actionsErrors.slice(index+1, ...this.reportFormValidation.actionsErrors.length)
        ]
    }

    @action
    checkIfDayIsReported(){
        this.imBusyCheckingIfDayReported = true;
        let userId = JSON.parse(localStorage.getItem("authData"))._id
        return APIs
        .reports
        .checkIfDayIsReported({workerId: userId, day: this.reportForm.reportedDay})
        .then((data) => {
            if(data.statusCode < 200 || data.statusCode >= 300){
                throw data
            }
            console.log('check if day is reported success', data);
            this.shouldCheckIfDayIsReported = false
            this.isDayReported = data.isDayReported
            if(data.savedIncompletedReport){
                this.reportForm = {...data.savedIncompletedReport}
                this.isReportCorrect()
            }
            this.imWithErrorCheckingIfDayReported = false;
            this.imBusyCheckingIfDayReported = false;
        })
        .catch((errors) => {
            console.log('check if day is reported errors', errors);
            this.checkingIfDayReportedError = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
            this.imWithErrorCheckingIfDayReported = true;
            this.imBusyCheckingIfDayReported = false;
        });
    }

    @action
    getReportToSend(mode){
        let userId = JSON.parse(localStorage.getItem("authData"))._id
        let _report = {
            worker: userId,
            actions: this.reportForm.actions,
            reportedDay: this.reportForm.reportedDay, 
        }

        if(mode === "incompletedMode"){
            _report.status= "incompleted"
        } else {
            _report.status= "waiting"
        }

        return _report
    }

    @action
    submitReport(mode = "sendToAdmin"){
        if(this.reportForm._id){
            this.updateReport(mode)
        } else {
            this.addReport(mode)
        }
    }

    @action
    addReport(incompletedMode){
        this.imBusy = true;
        if(this.isReportCorrect()){
            return APIs
            .reports
            .addReport(this.getReportToSend(incompletedMode))
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('add Report success', data);
                this.showSuccessSnackbar = true
                if(incompletedMode === "sendToAdmin"){
                    this.clearNewReportForm()
                    this.successSnackbarMessage = "Raport wysłany pomyślnie."
                } else {
                    this.successSnackbarMessage = "Raport zapisany pomyślnie."
                }
                this.checkIfDayIsReported()
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('add Report errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.imBusy = false
        }
    }

    @action
    updateReport(incompletedMode){
        this.imBusy = true;
        if(this.isReportCorrect()){
            return APIs
            .reports
            .updateReport(this.getReportToSend(incompletedMode), this.reportForm._id)
            .then((data) => {
                if(data.statusCode < 200 || data.statusCode >= 300){
                    throw data
                }
                console.log('add Report success', data);
                this.showSuccessSnackbar = true
                if(incompletedMode === "sendToAdmin"){
                    this.clearNewReportForm()
                    this.successSnackbarMessage = "Raport wysłany pomyślnie."
                } else {
                    this.successSnackbarMessage = "Raport zapisany pomyślnie."
                }
                this.checkIfDayIsReported()
                this.imWithError = false;
                this.imBusy = false;
            })
            .catch((errors) => {
                console.log('add Report errors', errors);
                this.error = "Błąd podczas łączenia z serwerem. Spróbuj ponownie później.";
                this.imWithError = true;
                this.imBusy = false;
            });
        } else {
            this.imBusy = false
        }
    }

    @action
    isReportCorrect(){
        let isCorrect = true
            let _actionsErrors = this.reportForm.actions.map((action) => {
                let descriptionError = emptyValidation(action.description)
                if(descriptionError.length > 0){
                    isCorrect = false
                }
                return {
                    actionTypeError: "",
                    descriptionError: descriptionError
                }
            })

            this.reportFormValidation.actionsErrors = [..._actionsErrors]
        return isCorrect
    }

    @action
    clearNewReportForm(){
        this.reportForm = {
            reportedDay: moment(new Date()),
            actions: []
        }
    }
  

}

export default AddReportStore;
