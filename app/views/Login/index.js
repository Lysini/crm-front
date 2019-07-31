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
    LoginHeader,
    LoginForm
} from './components'

import RerouteLogged from '@components/RerouteLogged'

import {
    buttonStyles
} from '@styles/button.styles'

@RerouteLogged
@withRouter
@inject("authStore")
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        let {
            authStore,
            classes
        } = this.props
        return (
            <div className="full-height flex auth-view-container justify-content-center align-items-center" >
                <div className="flex-column bg-white auth-window-container animated gold-border fadeIn">
                    <LoginHeader />
                    
                    <LoginForm />             
                    
                    {authStore.imWithErrorLogin &&
                        <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                            {authStore.errorLogin}
                        </Typography>
                    }

                    {/* <Link 
                        className="btn pl-auto pr-auto mr-auto ml-auto p-0" 
                        style={{ marginTop: 10}} 
                        to={'/remind-password'}
                        disabled={authStore.imBusy}
                    >
                        <Button 
                            color="primary"
                        >
                            Zapomniałem hasła
                        </Button>
                    </Link> */}

                    <Button
                        style={{ marginTop: 15 }} 
                        className={`${classes.success} ml-auto mr-auto auth-form-width`}
                        variant={'contained'}
                        onClick={() => authStore.login()}
                        disabled={authStore.imBusy}
                    >
                        Zaloguj się
                        {authStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                    </Button>

                    <Link 
                        className="btn ml-auto mr-auto auth-form-width p-0" 
                        style={{ marginTop: 15, marginBottom: 40 }} 
                        to={'/send-problem'}
                    >
                        <Button
                            className={`custom-btn-gold`}
                            variant={'contained'}
                            fullWidth={true}
                        >
                            Chce zgłosić problem finansowy
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(Login)