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
            <Typography variant="h4" color="inherit" className="m-3">
                Raport dnia
            </Typography>
            <Divider className="mb-2" />
        </div>
    )
}

export const SuccessSnackbar = inject("addReportStore")(observer((props) => {
    let {
        addReportStore
    } = props
    return (
        <SnackbarComponent
            text={addReportStore.successSnackbarMessage}
            open={addReportStore.showSuccessSnackbar}
            onClose={() => addReportStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))