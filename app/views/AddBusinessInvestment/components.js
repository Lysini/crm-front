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
                Uzupełnij dane i dodaj inwestycje
            </Typography>
            <Divider className="mb-2" />
        </div>
    )
}

export const SuccessSnackbar = inject("addBusinessInvestmentStore")(observer((props) => {
    let {
        addBusinessInvestmentStore
    } = props
    return (
        <SnackbarComponent
            text={"Inwestycja dodana pomyślnie!"}
            open={addBusinessInvestmentStore.showSuccessSnackbar}
            onClose={() => addBusinessInvestmentStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))