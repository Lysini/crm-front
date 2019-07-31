import React from "react";
import { withRouter } from "react-router-dom";
import {
    inject, 
    observer
} from 'mobx-react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import {
    Header,
    SuccessSnackbar
} from './components'

import {
    ReportDayForm,
    ReportActionsForm,
    AddActionForm
} from './forms'

import {
    buttonStyles
} from '@styles/button.styles'

import { 
    ErrorPanel,
    InfoPanel 
} from '@uiparts'

@withRouter
@inject("addReportStore")
@observer
class AddReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.addReportStore.shouldCheckIfDayIsReported){
            this.props.addReportStore.checkIfDayIsReported()
        }
    }

    render() {
        let {
            classes,
            addReportStore
        } = this.props
        
        let {
            imBusyCheckingIfDayReported,
            isDayReported,
            imWithErrorCheckingIfDayReported,
            checkIfDayIsReported
        } = addReportStore
        return (
            <div className="animated fadeIn flex flex-column add-report-window-container">
                <div className="add-report-form">
                    <Header />
                    
                    <div>
                        <ReportDayForm />

                        {   imBusyCheckingIfDayReported &&
                                <div className="flex justify-content-center align-items-center mt-2 mb-2">
                                    <CircularProgress size={60} className={`${classes.circleProgressSuccess}`} />
                                </div>
                        }

                        {   !imBusyCheckingIfDayReported && isDayReported &&
                                <InfoPanel message={"Utworzyłeś już raport z wybranego dnia."}/>
                        }

                        {   imWithErrorCheckingIfDayReported &&
                                <ErrorPanel onClick={() => addReportStore.checkIfDayIsReported()} message={"Błąd podczas łączenia z serwerem. Kliknij by spróbować ponownie."}/>
                        }

                        {   !imBusyCheckingIfDayReported && !isDayReported && !imWithErrorCheckingIfDayReported &&
                                <AddActionForm />
                        }

                        {   !imBusyCheckingIfDayReported && !isDayReported && !imWithErrorCheckingIfDayReported &&
                                <ReportActionsForm />
                        }

                        {addReportStore.imWithError &&
                            <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                                {addReportStore.error}
                            </Typography>
                        }

                        {   !imBusyCheckingIfDayReported && !isDayReported && !imWithErrorCheckingIfDayReported &&
                            <Button
                                style={{ marginTop: 10 }} 
                                className={`custom-btn-success`}
                                variant={'contained'}
                                onClick={() => addReportStore.submitReport("incompletedMode")}
                                disabled={addReportStore.imBusy}
                                fullWidth
                            >
                                Zapisz zmiany
                                { addReportStore.imBusy && 
                                    <CircularProgress size={20} className={`${classes.circleProgressPrimary} ml-3`} />
                                }
                            </Button>
                        }

                        {   !imBusyCheckingIfDayReported && !isDayReported && !imWithErrorCheckingIfDayReported &&
                            <Button
                                style={{ marginTop: 10, marginBottom: 40 }} 
                                className={`custom-btn-primary`}
                                variant={'contained'}
                                onClick={() => addReportStore.submitReport()}
                                disabled={addReportStore.imBusy}
                                fullWidth
                            >
                                Prześlij do zatwierdzenia
                                { addReportStore.imBusy && 
                                    <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />
                                }
                            </Button>
                        }
                    </div>
                </div>
                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(AddReport)