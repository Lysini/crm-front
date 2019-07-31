import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
    CommonDropzone, 
    CommonSelect, 
    ErrorPanel,
    InfoPanel 
} from '@uiparts'

const convertAdvisorsForSelect = (advisors) => {
    return advisors.map((advisor) => {
        return {
            label: `${advisor.firstName} ${advisor.lastName}`,
            value: advisor._id
        }
    })
}

export const EditBusinessInvestmentsModal = inject("businessInvestmentsListStore")(observer((props) => {
    let {
        businessInvestmentsListStore
    } = props

    return (
        <Dialog 
            open={businessInvestmentsListStore.showEditModal} 
            onClose={() => businessInvestmentsListStore.showEditModal = false} 
            aria-labelledby="form-dialog-title"
            PaperProps={{className: "edit-investment-modal"}}
        >
            <DialogTitle id="form-dialog-title">Edycja Inwestycji</DialogTitle>
            <DialogContent className="edit-investment-modal">
                <EditInvestmentForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => businessInvestmentsListStore.showEditModal = false} color="primary">
                    Anuluj
                </Button>
                <Button
                    color="primary"
                    onClick={() => businessInvestmentsListStore.updateInvestment()}
                    disabled={businessInvestmentsListStore.imBusyUpdatingInvestment}
                >
                    Zapisz zmiany
                    {businessInvestmentsListStore.imBusyUpdatingInvestment && <CircularProgress size={20} className={`ml-3`} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}))


const EditInvestmentForm = inject("businessInvestmentsListStore")(observer((props) => {

    let {
        businessInvestmentsListStore,
    } = props

    let {
        investmentToEdit,
        investmentToEditValidation,
        investorsFilters,
        investorsList,
        advisorsList
    } = businessInvestmentsListStore

    return (
        <FormControl className="full-width">
            <TextField
                fullWidth={true}
                label="Wyszukaj inwestora i naciśnij lupę"
                value={investorsFilters.search}
                onChange={(e) => investorsFilters.search = e.target.value}
                placeholder="Wyszukaj inwestora i naciśnij lupę"
                margin="normal"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="Filtry" onClick={() => businessInvestmentsListStore.getInvestors()}>
                                <Icon>search</Icon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
  
            {!businessInvestmentsListStore.imGettingInvestors && businessInvestmentsListStore.gettingInvestorsWithError &&
                <ErrorPanel 
                    message={businessInvestmentsListStore.gettingInvestorsError} 
                    onClick={() => businessInvestmentsListStore.getInvestors()} 
                />
            }

            {!businessInvestmentsListStore.imGettingInvestors && 
             !businessInvestmentsListStore.gettingInvestorsWithError &&
             investorsList.length === 0 &&
                <InfoPanel 
                    message={"Nie znaleziono żadnych wyników"} 
                />
            }

            {businessInvestmentsListStore.imGettingInvestors && 
                <CircularProgress size={60} className="m-auto" />
            }

            {!businessInvestmentsListStore.imGettingInvestors && 
             !businessInvestmentsListStore.gettingInvestorsWithError &&
             investorsList.length > 0 &&
                <List 
                    style={{ 
                        minHeight: "150px", 
                        maxHeight: "20vh", 
                        overflow: 'scroll', 
                        overflowX: "hidden", 
                        overflowY: 'auto',
                        borderColor: investmentToEditValidation.investorError && 'red'
                    }} 
                    className="primary-border"
                    dense
                >
                    <ListItem disabled>
                        <ListItemText primary={"Wybierz inwestora"} />
                    </ListItem>
                    {   investorsList
                        .map((investor, k) => (
                            <ListItem 
                                key={k} 
                                button
                                onClick={() => investmentToEdit.investor = investor} 
                                style={{
                                    borderTopWidth: 1,
                                    borderTopStyle: 'solid',
                                    borderTopColor: '#ccc'
                                }}
                            >
                                <ListItemText primary={`${investor.firstName} ${investor.lastName}`} />
                                <ListItemSecondaryAction>
                                    <Checkbox 
                                        color="primary"
                                        onChange={() => investmentToEdit.investor = investor} 
                                        checked={investmentToEdit.investor._id === investor._id} 
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List> 
            }

            <TextField
                fullWidth={true}
                label="Kwota"
                value={investmentToEdit.value}
                onChange={(e) => investmentToEdit.value = e.target.value}
                error={investmentToEditValidation.valueError.length > 0}
                placeholder="Kwota"
                margin="normal"
                variant="outlined"
                helperText={investmentToEditValidation.valueError}
            />

            <TextField
                multiline={true}
                rows="5"
                maxrows="5"
                fullWidth={true}
                label="Warunki"
                value={investmentToEdit.conditions}
                onChange={(e) => investmentToEdit.conditions = e.target.value}
                error={investmentToEditValidation.conditionsError.length > 0}
                placeholder="Warunki"
                margin="normal"
                variant="outlined"
                helperText={investmentToEditValidation.conditionsError}
            /> 

            <CommonSelect 
                options={convertAdvisorsForSelect(advisorsList)}
                label={"Wybierz opiekuna"}
                value={investmentToEdit.advisor._id}
                onChange={(value) => investmentToEdit.advisor._id = value}
                error={investmentToEditValidation.advisorError.length > 0}
                errorMessage={investmentToEditValidation.advisorError}
            />

            {!businessInvestmentsListStore.imGettingAdvisors && businessInvestmentsListStore.gettingAdvisorsWithError &&
                <ErrorPanel 
                    message={businessInvestmentsListStore.gettingAdvisorsError} 
                    onClick={() => businessInvestmentsListStore.getAdvisors()} 
                />
            }

            <CommonDropzone 
                onDrop={(newFile) => businessInvestmentsListStore.dropFile(newFile)}
                accept=".pdf"
                validationError={businessInvestmentsListStore.businessPlanFileError}
                file={businessInvestmentsListStore.businessPlanFile}
                title={"Kliknij lub przeciąg i upuść plik z biznesplanem."}
            />

            {businessInvestmentsListStore.businessPlanFile.name &&
                <Button
                    variant="contained"
                    className="custom-btn-danger"
                    color="primary"
                    onClick={() => businessInvestmentsListStore.businessPlanFile = {}}
                >
                    Usuń plik
                </Button>
            }
        </FormControl>
    )
}))
