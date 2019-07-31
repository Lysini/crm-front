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
    NewBusinessInvestment
} from './forms'

import {
    buttonStyles
} from '@styles/button.styles'

import {
    ErrorPanel
} from '@uiparts'


@withRouter
@inject("addBusinessInvestmentStore")
@observer
class AddEstate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.addBusinessInvestmentStore.shouldIFetchAdvisors){
            this.props.addBusinessInvestmentStore.getAdvisors()
        }

        if(this.props.addBusinessInvestmentStore.shouldIFetchInvestors){
            this.props.addBusinessInvestmentStore.getInvestors()
        }
    }

    render() {
        let {
            classes,
            addBusinessInvestmentStore
        } = this.props
        return (
            <div className="animated fadeIn flex flex-column add-investment-window-container">
                <div className="add-investment-form">
                    <Header />
                    
                    <div className="ml-auto mr-auto">
                        <NewBusinessInvestment />

                        {addBusinessInvestmentStore.imWithError &&
                            <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                                {addBusinessInvestmentStore.error}
                            </Typography>
                        }

                        <Button
                            style={{ marginTop: 10, marginBottom: 40 }} 
                            className={`${classes.success} `}
                            variant={'contained'}
                            onClick={() => addBusinessInvestmentStore.addBusinessInvestment()}
                            disabled={addBusinessInvestmentStore.imBusy}
                            fullWidth
                        >
                            Dodaj
                            {addBusinessInvestmentStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                        </Button>
                    </div>
                </div>
                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(AddEstate)