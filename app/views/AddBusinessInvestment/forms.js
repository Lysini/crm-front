import React from "react";
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

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

export const NewBusinessInvestment = inject("addBusinessInvestmentStore")(observer((props) => {
    let {
        businessInvestmentForm,
        businessInvestmentFormValidation,
        advisorsList,
        investorsList,
        investorsFilters
    } = props.addBusinessInvestmentStore

    let {
        addBusinessInvestmentStore
    } = props
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
                            <IconButton aria-label="Filtry" onClick={() => addBusinessInvestmentStore.getInvestors()}>
                                <Icon>search</Icon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
  
            {!addBusinessInvestmentStore.imGettingInvestors && addBusinessInvestmentStore.gettingInvestorsWithError &&
                <ErrorPanel 
                    message={addBusinessInvestmentStore.gettingInvestorsError} 
                    onClick={() => addBusinessInvestmentStore.getInvestors()} 
                />
            }

            {!addBusinessInvestmentStore.imGettingInvestors && 
             !addBusinessInvestmentStore.gettingInvestorsWithError &&
             investorsList.length === 0 &&
                <InfoPanel 
                    message={"Nie znaleziono żadnych wyników"} 
                />
            }

            {addBusinessInvestmentStore.imGettingInvestors && 
                <CircularProgress size={60} className="m-auto" />
            }

            {!addBusinessInvestmentStore.imGettingInvestors && 
             !addBusinessInvestmentStore.gettingInvestorsWithError &&
             investorsList.length > 0 &&
                <List 
                    style={{ 
                        minHeight: "150px", 
                        // height: "20vh",
                        maxHeight: "20vh", 
                        overflow: 'scroll', 
                        overflowX: "hidden", 
                        overflowY: 'auto',
                        borderColor: businessInvestmentFormValidation.investorError && 'red'
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
                                onClick={() => businessInvestmentForm.investor = investor} 
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
                                        onChange={() => businessInvestmentForm.investor = investor} 
                                        checked={businessInvestmentForm.investor._id === investor._id} 
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
                value={businessInvestmentForm.value}
                onChange={(e) => businessInvestmentForm.value = e.target.value}
                error={businessInvestmentFormValidation.valueError.length > 0}
                placeholder="Kwota"
                margin="normal"
                variant="outlined"
                helperText={businessInvestmentFormValidation.valueError}
            />

            <TextField
                multiline={true}
                rows="5"
                maxrows="5"
                fullWidth={true}
                label="Warunki"
                value={businessInvestmentForm.conditions}
                onChange={(e) => businessInvestmentForm.conditions = e.target.value}
                error={businessInvestmentFormValidation.conditionsError.length > 0}
                placeholder="Warunki"
                margin="normal"
                variant="outlined"
                helperText={businessInvestmentFormValidation.conditionsError}
            /> 

            <CommonSelect 
                options={convertAdvisorsForSelect(advisorsList)}
                label={"Wybierz opiekuna"}
                value={businessInvestmentForm.advisor._id}
                onChange={(value) => businessInvestmentForm.advisor._id = value}
                error={businessInvestmentFormValidation.advisorError.length > 0}
                errorMessage={businessInvestmentFormValidation.advisorError}
            />

            {!addBusinessInvestmentStore.imGettingAdvisors && addBusinessInvestmentStore.gettingAdvisorsWithError &&
                <ErrorPanel 
                    message={addBusinessInvestmentStore.gettingAdvisorsError} 
                    onClick={() => addBusinessInvestmentStore.getAdvisors()} 
                />
            }

            <CommonDropzone 
                onDrop={(newFile) => addBusinessInvestmentStore.dropFile(newFile)}
                accept=".pdf"
                validationError={addBusinessInvestmentStore.businessPlanFileError}
                file={addBusinessInvestmentStore.businessPlanFile}
                title={"Kliknij lub przeciąg i upuść plik z biznesplanem."}
            />
        </FormControl>
    )
}))