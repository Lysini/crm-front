import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


export const ContactForm = inject("sendProblemStore")(observer((props) => {
    let {
        sendProblemStore
    } = props
    let {
        contactDataForm,
        contactDataFormValidation
    } = sendProblemStore
    return (
        <FormControl className="full-width">
            <Typography className="ml-auto mr-auto mt-2" variant="subtitle1" color="inherit">
                Zostaw nam swoje dane abyśmy mogli się z Tobą skontaktować.
            </Typography>

            <TextField
                fullWidth={true}
                label="Imie i nazwisko"
                value={contactDataForm.fullName}
                onChange={(e) => contactDataForm.fullName = e.target.value}
                error={contactDataFormValidation.fullNameError.length > 0}
                placeholder="Imie i nazwisko"
                margin="normal"
                variant="outlined"
                helperText={contactDataFormValidation.fullNameError}
            />

            <TextField
                fullWidth={true}
                label="E-mail"
                value={contactDataForm.email}
                onChange={(e) => contactDataForm.email = e.target.value}
                error={contactDataFormValidation.emailError.length > 0}
                placeholder="E-mail"
                margin="normal"
                variant="outlined"
                helperText={contactDataFormValidation.emailError}
            />

            <TextField
                fullWidth={true}
                label="Numer Telefonu"
                value={contactDataForm.phone}
                onChange={(e) => contactDataForm.phone = e.target.value}
                error={contactDataFormValidation.phoneError.length > 0}
                placeholder="Numer Telefonu"
                margin="normal"
                variant="outlined"
                helperText={contactDataFormValidation.phoneError}
            />
        </FormControl>
    )
}))