import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';


import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

export const NewInvestorForm = inject("addInvestorStore")(observer((props) => {
    let {
        newInvestorForm,
        newInvestorFormValidation,
        advisorsList
    } = props.addInvestorStore
    let {
        classes
    } = props
    return (
        <form className="ml-auto mr-auto">
            <FormControl fullWidth>
                <TextField
                    required
                    error={newInvestorFormValidation.firstNameError.length > 0}
                    fullWidth={true}
                    label="Imie"
                    value={newInvestorForm.firstName}
                    onChange={(e) => newInvestorForm.firstName = e.target.value}
                    placeholder="Imie"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    helperText={newInvestorFormValidation.firstNameError}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    required
                    error={newInvestorFormValidation.lastNameError.length > 0}
                    fullWidth={true}
                    label="Nazwisko"
                    value={newInvestorForm.lastName}
                    onChange={(e) => newInvestorForm.lastName = e.target.value}
                    placeholder="Nazwisko"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    helperText={newInvestorFormValidation.lastNameError}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    required
                    error={newInvestorFormValidation.emailError.length > 0}
                    fullWidth={true}
                    label="E-mail"
                    value={newInvestorForm.email}
                    onChange={(e) => newInvestorForm.email = e.target.value}
                    placeholder="E-mail"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    helperText={newInvestorFormValidation.emailError}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    required
                    error={newInvestorFormValidation.phoneError.length > 0}
                    fullWidth={true}
                    label="Numer Telefonu"
                    value={newInvestorForm.phone}
                    onChange={(e) => newInvestorForm.phone = e.target.value}
                    placeholder="Numer Telefonu"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    helperText={newInvestorFormValidation.phoneError}
                />
            </FormControl>

            <TextField
                multiline={true}
                rows="5"
                rowsMax="5"
                required
                error={newInvestorFormValidation.descriptionError.length > 0}
                fullWidth={true}
                label="Opis warunków"
                value={newInvestorForm.description}
                onChange={(e) => newInvestorForm.description = e.target.value}
                placeholder="Opis warunków"
                options={{ autoComplete: 'off' }}
                margin="normal"
                variant="outlined"
                helperText={newInvestorFormValidation.descriptionError.length > 0 ?newInvestorFormValidation.descriptionError :"Opisz na jaki procent udzielany jest kredyt, na jakich udziałach w spółce celowej (inwestor może wziąć maksimum 25% spółki)."}
            />

            <List 
                style={{ 
                    minHeight: "150px", 
                    // height: "20vh",
                    maxHeight: "20vh", 
                    overflow: 'scroll', 
                    overflowX: "hidden", 
                    overflowY: 'auto',
                    borderColor: newInvestorFormValidation.advisorError && 'red'
                }} 
                className={'primary-border'}
                dense
            >
                <ListItem disabled>
                    <ListItemText primary={"Wybierz opiekuna dla nowego inwestora"} />
                </ListItem>
                {   advisorsList
                    .map((advisor, k) => (
                        <ListItem 
                            key={k} 
                            button
                            onClick={() => newInvestorForm.advisor = advisor} 
                            style={{
                                borderTopWidth: 1,
                                borderTopStyle: 'solid',
                                borderTopColor: '#ccc'
                            }}
                        >
                            <ListItemText primary={`${advisor.firstName} ${advisor.lastName}`} />
                            <ListItemSecondaryAction>
                                <Checkbox 
                                    color="primary"
                                    onChange={() => newInvestorForm.advisor = advisor} 
                                    checked={newInvestorForm.advisor._id === advisor._id} 
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </form>
    )
}))