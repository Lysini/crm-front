import React from "react";
import { Link } from 'react-router-dom'
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
    RemindPasswordHeader,
    RemindPasswordForm
} from './components'

import {
    buttonStyles
} from '@styles/button.styles'

import RerouteLogged from '@components/RerouteLogged'

@RerouteLogged
@withRouter
@inject("authStore")
@observer
class RemindPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {
            classes,
            authStore
        } = this.props
        return (
            <div className="full-height flex bg-white justify-content-center align-items-center" >
                <div className="flex-column auth-window-container animated fadeIn">
                    <RemindPasswordHeader />
                    
                    <RemindPasswordForm />

                    {authStore.imWithErrorRemindPassword &&
                        <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                            {authStore.errorRemindPassword}
                        </Typography>
                    }
                    
                    <Link 
                        className="btn pl-auto pr-auto mr-auto ml-auto p-0" 
                        style={{ marginTop: 10}} 
                        to={'/log-in'}
                    >
                        <Button 
                            color="primary"
                        >
                            Logowanie
                        </Button>
                    </Link>

                    <Button
                        style={{marginTop: 10, marginBottom: 40 }}
                        className={`${classes.success} ml-auto mr-auto auth-form-width`}
                        variant={'contained'}
                        onClick={() => authStore.remindPassword()}
                        disabled={authStore.imBusy}
                    >
                        Przypomnij hasło
                        {authStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                    </Button>

                </div>
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(RemindPassword)