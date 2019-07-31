import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


export const FirmDataForm = inject("sendProblemStore")(observer((props) => {
    let {
        sendProblemStore
    } = props
    let {
        firmDataForm,
        firmDataFormValidation
    } = sendProblemStore
    return (
        <FormControl className="full-width">
            <TextField
                fullWidth={true}
                label="NIP"
                value={firmDataForm.nip}
                onChange={(e) => firmDataForm.nip = e.target.value}
                error={firmDataFormValidation.nipError.length > 0}
                placeholder="NIP"
                margin="normal"
                variant="outlined"
                helperText={firmDataFormValidation.nipError}
            />
        </FormControl>
    )
}))