import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { 
    SnackbarComponent 
} from '@uiparts'


export const Header = () => {
    return (
        <div className="text-center">
            <Typography variant="h5" color="inherit" className="m-3">
                Uzupełnij dane i dodaj nieruchomość
            </Typography>
            <Divider className="mb-2" />
        </div>
    )
}

export const SuccessSnackbar = inject("addEstateStore")(observer((props) => {
    let {
        addEstateStore
    } = props
    return (
        <SnackbarComponent
            text={"Nieruchomość dodana pomyślnie!"}
            open={addEstateStore.showSuccessSnackbar}
            onClose={() => addEstateStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))