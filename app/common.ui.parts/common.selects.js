import React from "react";
import ReactDOM from 'react-dom';
import { observer } from "mobx-react-lite"
import { withStyles } from '@material-ui/core/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export const styles = theme => ({
    primaryBorder: {
        borderColor: '#3f51b5',
        borderStyle: 'solid',
        borderWidth: 1
    }
});

export const CommonSelect = observer((props) => {
    const [selectWidth, setSelectWidth] = React.useState(0);

    const selectRef = React.useRef(null);

    React.useEffect(() => {
        setSelectWidth(ReactDOM.findDOMNode(selectRef.current).offsetWidth)
    })

    let {
        label,
        options,
        allOption = false,
        chooseOption = true,
        value,
        onChange,
        error = false,
        errorMessage = "",
        fullWidth = true,
        style= { marginTop: 10 }
    } = props
    return (
        <FormControl fullWidth={fullWidth} variant="outlined" style={style}>
            <InputLabel ref={selectRef} htmlFor="outlined-ground-type">
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                input={
                    <OutlinedInput labelWidth={selectWidth} error={error} name="type" id="outlined-ground-type" />
                }
            >
                {   allOption &&
                        <MenuItem value="">
                            Wszystkie
                        </MenuItem>
                }

                {   chooseOption &&
                        <MenuItem value="" disabled>
                            Wybierz
                        </MenuItem>
                }
                {   options.map((option, k) => (
                        <MenuItem key={k} value={option.value}>{option.label}</MenuItem>
                    ))
                }
            </Select>
            { error && <FormHelperText error>{errorMessage}</FormHelperText> }
        </FormControl>
    )
}) 

export const SelectableList = withStyles(styles)(observer((props) => {
    let {
        classes,
        error,
        title,

    } = props

    return (
        <List 
            style={{ 
                minHeight: "150px", 
                // height: "20vh",
                maxHeight: "20vh", 
                overflow: 'scroll', 
                overflowX: "hidden", 
                overflowY: 'auto',
                marginTop: 10,
                borderColor: error && 'red'
            }} 
            className={classes.primaryBorder}
            dense
        >
            <ListItem disabled>
                <ListItemText primary={title} />
            </ListItem>
            {   advisorsList
                .map((advisor, k) => (
                    <ListItem 
                        key={k} 
                        button
                        onClick={() => businessInvestmentForm.advisor = advisor} 
                        style={{
                            borderTopWidth: 1,
                            borderTopStyle: 'solid',
                            borderTopColor: '#ccc'
                        }}
                    >
                        <ListItemText primary={`${advisor.firstName} ${advisor.lastName}`} />
                        <ListItemSecondaryAction>
                            <Checkbox 
                                color="primary"
                                onChange={() => businessInvestmentForm.advisor = advisor} 
                                checked={businessInvestmentForm.advisor._id === advisor._id} 
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
        </List> 
    )
}))