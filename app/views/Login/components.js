import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    cssLabel: {
      '&$cssFocused': {
        color: '#f8b133',
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: '#f8b133',
      },
    },
    cssOutlinedInput: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: '4px',
      '&$cssFocused $notchedOutline': {
        borderColor: '#f8b133',
      },
    },
    notchedOutline: {}
  });

export const LoginForm = withStyles(styles)(inject("authStore")(observer((props) => {
    let {
        loginForm,
        loginFormValidation
    } = props.authStore

    let {
        classes
    } = props

    return (
        <form className="ml-auto mr-auto auth-form-width">
            <FormControl fullWidth>
                <TextField
                    required
                    error={loginFormValidation.emailError.length > 0}
                    fullWidth={true}
                    label="E-mail"
                    value={loginForm.email}
                    onChange={(e) => loginForm.email = e.target.value}
                    placeholder="E-mail"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    helperText={loginFormValidation.emailError}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    type="password"
                    required
                    error={loginFormValidation.passwordError.length > 0}
                    fullWidth={true}
                    label="Hasło"
                    placeholder="Hasło"
                    options={{ autoComplete: 'off' }}
                    value={loginForm.password}
                    onChange={(e) => loginForm.password = e.target.value}
                    margin="normal"
                    variant="outlined"
                    helperText={loginFormValidation.passwordError}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                />
            </FormControl>
        </form>
    )
})))

export const LoginHeader = () => {
    return (
        <div className="text-center pt-2">
            <img className="width-65 p-3" src={'/images/logo_czarne.png'} />

            <Typography variant="subtitle1" color="inherit" noWrap>
                Zaloguj się by korzystać z aplikacji
            </Typography>
            <Divider className="mt-2 gold-divider" />
        </div>
    )
}