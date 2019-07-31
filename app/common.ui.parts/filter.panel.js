import React from 'react';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { InlineDatePicker } from 'material-ui-pickers';

import {
    CommonSelect
} from './common.selects'

import {
    buttonStyles
} from '@styles/button.styles'

export const FiltersPanel = withStyles(buttonStyles)(observer((props) => {
    const {
        onChange,
        expanded,
        filtersRows,
        classes,
        filters,
        getData,
        imBusy,
        showSearch = true
    } = props
    return (
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelDetails>
                <div className="full-width">
                    {   showSearch &&
                            <FormControl className="full-width">
                                <TextField
                                    fullWidth={true}
                                    label="Wyszukaj frazę"
                                    value={filters.search}
                                    onChange={(e) => onChange("search", e.target.value)}
                                    placeholder="Wyszukaj frazę"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton aria-label="Filtry" disabled>
                                                    <Icon>search</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                    }

                    {   filtersRows.map((row, k) => {
                            return (
                                <div className="row" key={k}>
                                    {   row.map((filterColumn, j) => {
                                            return (
                                                <div className={`col-${12/row.length}`} key={j}>
                                                    {   filterColumn.type === "select" &&
                                                            <CommonSelect 
                                                                options={filterColumn.options}
                                                                allOption={true}
                                                                chooseOption={false}
                                                                label={filterColumn.label}
                                                                value={filters[filterColumn.propName]}
                                                                onChange={(value) => onChange(filterColumn.propName, value)}
                                                            />
                                                    }
                                                    {   filterColumn.type === "date" &&
                                                            <InlineDatePicker
                                                                fullWidth
                                                                style={{
                                                                    marginTop: 10
                                                                }}
                                                                keyboard
                                                                clearable
                                                                variant="outlined"
                                                                label={filterColumn.label}
                                                                value={filters[filterColumn.propName]}
                                                                onChange={(date) => onChange(filterColumn.propName, date)}
                                                                format={'DD/MM/YYYY'}
                                                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                            />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                    <Button
                        fullWidth
                        style={{ marginTop: 10}} 
                        className={`${classes.success}`}
                        variant={'contained'}
                        onClick={() => getData()}
                        disabled={imBusy}
                    >
                        Filtruj
                        {imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                    </Button>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}))