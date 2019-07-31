import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';

import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    success: {
        backgroundColor: theme.palette.success.main,
    },
    info: {
        backgroundColor: theme.palette.info.main,
    },
    danger: {
        backgroundColor: theme.palette.danger.main,
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
});

export const SnackbarComponent = withStyles(styles)(observer((props) => {
    let {
        classes,
        open,
        onClose,
        color,
        text
    } = props
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={() => onClose()}
        >
            <SnackbarContent
                className={classNames(classes[color])}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {text}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => onClose()}
                    >
                    <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    )
}))