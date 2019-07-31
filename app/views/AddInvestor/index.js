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
    NewInvestorForm
} from './forms'

import {
    buttonStyles
} from '@styles/button.styles'

import {
    ErrorPanel
} from '@uiparts'


@withRouter
@inject("addInvestorStore")
@observer
class AddInvestor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.addInvestorStore.shouldIFetch){
            this.props.addInvestorStore.getAdvisors()
        }
    }

    render() {
        let {
            classes,
            addInvestorStore
        } = this.props
        return (
            <div className="animated fadeIn flex flex-column add-investor-window-container">
                <div className="add-investor-form">
                    <Header />
                    
                    <div className="new-investor-form ml-auto mr-auto">
                        <NewInvestorForm />

                        {addInvestorStore.imWithError &&
                            <Typography className="text-center" variant="subtitle2" color="inherit" style={{color: 'red'}}>
                                {addInvestorStore.error}
                            </Typography>
                        }

                        {!addInvestorStore.imGettingAdvisors && addInvestorStore.gettingAdvisorsWithError &&
                            <ErrorPanel message={addInvestorStore.gettingAdvisorsError} onClick={() => addInvestorStore.getAdvisors()} />
                        }

                        <Button
                            style={{ marginTop: 10, marginBottom: 40 }} 
                            className={`${classes.success} `}
                            variant={'contained'}
                            onClick={() => addInvestorStore.addInvestor()}
                            disabled={addInvestorStore.imBusy || addInvestorStore.imGettingAdvisors}
                            fullWidth
                        >
                            Dodaj
                            {addInvestorStore.imBusy && <CircularProgress size={20} className={`${classes.circleProgressSuccess} ml-3`} />}
                        </Button>
                    </div>
                </div>
                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(AddInvestor)