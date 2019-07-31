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
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ReportDetailsModal = inject("reportsListForAdminStore")(observer((props) => {
    let {
        reportsListForAdminStore
    } = props

    let reportedDate = `${moment(new Date(reportsListForAdminStore.reportToDetails.reportedDay)).format('Do MMMM YYYY')}`
    let workerFullName = `${reportsListForAdminStore.reportToDetails.worker.firstName} ${reportsListForAdminStore.reportToDetails.worker.lastName}`
    return (
        <Dialog 
            open={reportsListForAdminStore.showReportDetails} 
            onClose={() => reportsListForAdminStore.showReportDetails = false} 
            aria-labelledby="form-dialog-title"
            PaperProps={{className: "report-details-modal"}}
        >
            <DialogTitle id="form-dialog-title">
                {`Raport z dnia ${reportedDate} pracownika: ${workerFullName}`}
            </DialogTitle>
            <DialogContent className="report-details-modal">
                <ReportDetails />
            </DialogContent>
            { reportsListForAdminStore.imWithErrorChangingStatus &&
                <Typography variant="subtitle2" style={{color: 'red'}} color="inherit" className="ml-auto mr-auto text-center">
                    {reportsListForAdminStore.errorChangingStatus}
                </Typography>
            }
            <DialogActions>
                <Button 
                    onClick={() => reportsListForAdminStore.showReportDetails = false} 
                    className="font-color-info"
                >
                    Anuluj
                </Button>

                <Button 
                    onClick={() => reportsListForAdminStore.changeReportStatus("rejected")} 
                    className="font-color-danger"
                >
                    Odrzuć
                    {reportsListForAdminStore.imBusyChangingStatus.rejected && <CircularProgress size={20} className={`ml-3`} />}
                </Button>

                <Button 
                    onClick={() => reportsListForAdminStore.changeReportStatus("accepted")} 
                    className="font-color-success"
                >
                    Zaakceptuj
                    {reportsListForAdminStore.imBusyChangingStatus.accepted && <CircularProgress size={20} className={`ml-3`} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}))


const ReportDetails = inject("reportsListForAdminStore")(observer((props) => {
    let {
        reportToDetails,
    } = props.reportsListForAdminStore

    return (
        reportToDetails.actions.map((action, k) => {
            return (
                <FormControl key={k} className="full-width animated fadeIn">    
                    <Divider className="mt-3" />

                    <div className="full-width flex flex-row justify-content-between pt-1 pb-1 pr-1">
                        <Typography variant="h6" color="inherit" className="mt-auto mb-auto">
                            {action.actionType}
                        </Typography>
                    </div>

                    <Typography variant="subtitle1" color="inherit" className="mt-auto mb-auto">
                        {action.description}
                    </Typography>
                </FormControl>
            )
        })
    )
}))
