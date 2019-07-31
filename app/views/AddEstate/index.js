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
    NewEstateForm
} from './forms'

import {
    buttonStyles
} from '@styles/button.styles'

@withRouter
@inject("addEstateStore")
@observer
class AddEstate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.addEstateStore.shouldIFetch){
            this.props.addEstateStore.getAdvisors()
        }
    }

    render() {
        let {
            classes,
            addEstateStore
        } = this.props
        return (
            <div className="animated fadeIn flex flex-column add-estate-window-container">
                <div className="add-estate-form">
                    <Header />
                    
                    <div className="ml-auto mr-auto">
                        <NewEstateForm />

                        {addEstateStore.imWithError &&
                            <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                                {addEstateStore.error}
                            </Typography>
                        }

                        <Button
                            style={{ marginTop: 10, marginBottom: 40 }} 
                            className={`${classes.success} `}
                            variant={'contained'}
                            onClick={() => addEstateStore.addEstate()}
                            disabled={addEstateStore.imBusy}
                            fullWidth
                        >
                            Dodaj
                            {addEstateStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                        </Button>
                    </div>
                </div>
                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(AddEstate)