import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


export const PersonalDataForm = inject("sendProblemStore")(observer((props) => {
    let {
        sendProblemStore
    } = props
    let {
        personalDataForm,
        personalDataFormValidation
    } = sendProblemStore
    return (
        <FormControl className="full-width">
            <Typography className="ml-auto mr-auto mt-2" variant="subtitle1" color="inherit">
                Zostaw nam swoje dane abyśmy mogli się z Tobą skontaktować.
            </Typography>

            <TextField
                fullWidth={true}
                label="Imie i nazwisko"
                value={personalDataForm.name}
                onChange={(e) => personalDataForm.name = e.target.value}
                error={personalDataFormValidation.nameError.length > 0}
                placeholder="Imie i nazwisko"
                margin="normal"
                variant="outlined"
                helperText={personalDataFormValidation.nameError}
            />

            <TextField
                fullWidth={true}
                label="E-mail"
                value={personalDataForm.email}
                onChange={(e) => personalDataForm.email = e.target.value}
                error={personalDataFormValidation.emailError.length > 0}
                placeholder="E-mail"
                margin="normal"
                variant="outlined"
                helperText={personalDataFormValidation.emailError}
            />

            <TextField
                fullWidth={true}
                label="Numer telefonu"
                value={personalDataForm.phone}
                onChange={(e) => personalDataForm.phone = e.target.value}
                error={personalDataFormValidation.phoneError.length > 0}
                placeholder="Numer telefonu"
                margin="normal"
                variant="outlined"
                helperText={personalDataFormValidation.phoneError}
            />
        </FormControl>
    )
}))