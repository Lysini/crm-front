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
        color: 'rgb(222, 229, 27)',
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: 'rgb(222, 229, 27)',
      },
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: 'rgb(222, 229, 27)',
      },
    },
    notchedOutline: {}
  });


export const RemindPasswordForm = withStyles(styles)(inject("authStore")(observer((props) => {
    let {
        remindPasswordForm,
        remindPasswordFormValidation
    } = props.authStore
    let {
        classes
    } = props
    return (
        <form className="ml-auto mr-auto auth-form-width">
            <FormControl fullWidth>
                <TextField
                    required
                    error={remindPasswordFormValidation.emailError.length > 0}
                    fullWidth={true}
                    label="E-mail"
                    value={remindPasswordForm.email}
                    onChange={(e) => remindPasswordForm.email = e.target.value}
                    placeholder="E-mail"
                    options={{ autoComplete: 'off' }}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        }
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        }
                    }}
                    helperText={remindPasswordFormValidation.emailError.length > 0 ? remindPasswordFormValidation.emailError : "Podaj e-mail przypisany do konta, prześlemy na niego nowe hasło."}
                />
            </FormControl>
        </form>
    )
})))

export const RemindPasswordHeader = () => {
    return (
        <div className="text-center pt-2">
            <Typography className="auth-big-title" variant="h2" color="inherit" noWrap>
                App Name
            </Typography>
            <Typography className="auth-small-title" variant="h3" color="inherit" noWrap>
                App Name
            </Typography>

            <Typography variant="subtitle1" color="inherit" noWrap>
                Przypominanie hasła
            </Typography>
            <Divider className="mt-2" />
        </div>
    )
}