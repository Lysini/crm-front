import React from "react";
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import { 
    CommonSelect, 
} from '@uiparts'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

import { InlineDatePicker } from 'material-ui-pickers';

import { reportActions } from '@globals/globals'

const convertDictionariesForSelect = (dictionaries) => {
    return dictionaries.map((dictionary) => {
        return {
            label: dictionary,
            value: dictionary
        }
    })
}

export const ReportDayForm = inject("addReportStore")(observer((props) => {
    let {
        reportForm,
        checkIfDayIsReported
    } = props.addReportStore
    return (
        <FormControl className="full-width" style={{ paddingTop: 10 }}>
            <InlineDatePicker
                fullWidth
                keyboard
                clearable
                variant="outlined"
                label="Raportowany dzień"
                value={reportForm.reportedDay}
                onChange={(date) => props.addReportStore.changeReportedDate(date)}
                format={'DD/MM/YYYY'}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
        </FormControl>
    )
}))

export const AddActionForm = inject("addReportStore")(observer((props) => {
    let {
        newAction,
        newActionValidation,
        addNewAction
    } = props.addReportStore
    return (
        <FormControl className="full-width" style={{ paddingTop: 15 }}>
            <div className="flex flex-row">
                <CommonSelect 
                    options={convertDictionariesForSelect(reportActions)}
                    label={"Wybierz akcje"}
                    value={newAction.actionType}
                    onChange={(value) => newAction.actionType = value}
                    error={newActionValidation.actionTypeError.length > 0}
                    errorMessage={newActionValidation.actionTypeError}
                    style={{}}
                />

                <Fab 
                    size="medium" 
                    aria-label="Dodaj" 
                    className="custom-btn-success ml-2 ml-2"
                    onClick={() => props.addReportStore.addNewAction()}
                >
                    <AddIcon />
                </Fab>
            </div>
        </FormControl>
    )
}))

export const ReportActionsForm = inject("addReportStore")(observer((props) => {
    let {
        reportForm,
        reportFormValidation,
        deleteAction
    } = props.addReportStore
    return (
        reportForm.actions.map((action, k) => {
            return (
                <ReportActionForm  
                    key={k}
                    index={k}
                    action={action}
                    validation={reportFormValidation.actionsErrors[k]}
                    deleteAction={(index) => props.addReportStore.deleteAction(index)}
                />
            )
        })
    )
}))

const ReportActionForm = observer((props) => {
    let {
        action,
        validation,
        deleteAction,
        index
    } = props
    return (
        <FormControl className="full-width animated fadeIn">    
            <Divider className="mt-3" />

            <div className="full-width flex flex-row justify-content-between pt-1 pb-1 pr-1">
                <Typography variant="h6" color="inherit" className="mt-auto mb-auto">
                    {action.actionType}
                </Typography>

                <Fab 
                    size="small" 
                    aria-label="Usuń" 
                    className="custom-btn-danger ml-2"
                    onClick={() => deleteAction(index)}
                >
                    <DeleteIcon />
                </Fab>
            </div>

            <TextField
                multiline={true}
                className="m-0 mt-2"
                rows="5"
                maxrows="5"
                fullWidth={true}
                label="Opis"
                value={action.description}
                onChange={(e) => action.description = e.target.value}
                error={validation.descriptionError.length > 0}
                placeholder="Opis"
                margin="normal"
                variant="outlined"
                helperText={validation.descriptionError}
            />
        </FormControl>
    )
})