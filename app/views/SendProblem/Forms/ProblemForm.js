import React from "react";
import {
    inject, 
    observer
} from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';

import { replacePolishChars } from '@utils'

import { problemTypes } from '@globals/globals'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

import {
    styles
} from '../styles.js'


export const ProblemForm = withStyles(styles)(inject("sendProblemStore")(observer((props) => {
    let {
        problemSearch,
        problemsList,
        problem,
        problemValidation
    } = props.sendProblemStore
    let {
        classes,
        sendProblemStore
    } = props
    return (
        <FormControl className="full-width">
            <List 
                style={{ 
                    minHeight: "150px", 
                    // height: "20vh",
                    maxHeight: "20vh", 
                    overflow: 'scroll', 
                    overflowX: "hidden", 
                    overflowY: 'auto',
                    marginTop: 10,
                    borderColor: problemValidation.problemTypeError && 'red'
                }} 
                className={`gold-border`}
                dense
            >
                <ListItem disabled>
                    <ListItemText primary={"Wybierz z listy typ problemu, który Cię dotyczy."} />
                </ListItem>
                {   problemTypes
                    .map((option, k) => (
                        <ListItem 
                            key={k} 
                            button
                            onClick={() => problem.problemType = option} 
                            style={{
                                borderTopWidth: 1,
                                borderTopStyle: 'solid',
                                borderTopColor: '#ccc'
                            }}
                        >
                            <ListItemText primary={option.label} />
                            <ListItemSecondaryAction>
                                <Checkbox 
                                    color="primary" 
                                    onChange={() => problem.problemType = option} 
                                    checked={problem.problemType.label === option.label} 
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>

            <TextField
                multiline={true}
                rows="10"
                rowsMax="10"
                fullWidth={true}
                label="Opis Twojego problemu"
                value={problem.problemDescription}
                onChange={(e) => problem.problemDescription = e.target.value}
                error={problemValidation.problemDescriptionError.length > 0}
                placeholder="Opis Twojego problemu"
                margin="normal"
                variant="outlined"
                helperText={problemValidation.problemDescriptionError}
            />
        </FormControl>
    )
})))