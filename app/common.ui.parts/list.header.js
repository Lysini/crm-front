import React from 'react';
import classNames from 'classnames';
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';



export const styles = theme => ({
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto'
    },
});


export const ListHeader = withStyles(styles)(observer((props) => {
    let {
        title,
        isAnyFilter,
        refresh,
        clearFilters,
        toggleFilterbar,
        classes
    } = props
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: 0 > 0,
            })}
        >
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    {title}
                </Typography>
            </div>
            <IconButton onClick={() => refresh()} aria-label="Filtry">
                <Icon>refresh</Icon>
            </IconButton>
            <div className={classes.spacer} />
            <div className={`${classes.actions} flex-row`}>
                { isAnyFilter &&
                    <Tooltip title="Wyczyść Filtry">
                        <IconButton aria-label="Filtry" onClick={() => clearFilters()}>
                            <Icon>clear</Icon>
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title="Filtry">
                    <IconButton aria-label="Filtry" onClick={() => toggleFilterbar()}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    )
}))