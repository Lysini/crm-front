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
            <Typography variant="h5" color="inherit" className="mt-3 ml-3 mr-3">
                Uzupełnij dane i dodaj nowego inwestora
            </Typography>
            <Typography variant="subtitle1" color="inherit" className="mb-3 ml-3 mr-3">
                Po dodaniu otrzyma on wiadomość z zaproszeniem.
            </Typography>
            <Divider className="mb-2" />
        </div>
    )
}

export const SuccessSnackbar = inject("addInvestorStore")(observer((props) => {
    let {
        addInvestorStore
    } = props
    return (
        <SnackbarComponent
            text={"Inwestor został dodany pomyślnie!"}
            open={addInvestorStore.showSuccessSnackbar}
            onClose={() => addInvestorStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))