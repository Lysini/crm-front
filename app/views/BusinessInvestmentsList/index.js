import React from "react";
import { withRouter } from "react-router-dom";
import {
    inject, 
    observer
} from 'mobx-react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import { withStyles } from '@material-ui/core/styles';

import {
    TableHeader,
    TableToolbar,
    TableBodyContainer,
    Pagination,
    SuccessSnackbar
} from './components'

import {
    EditBusinessInvestmentsModal
} from './edit.business.investment.modal'

import {
    TableStatusComponent
} from '@uiparts'

import {
    buttonStyles
} from '@styles/button.styles'


@withRouter
@inject("businessInvestmentsListStore")
@observer
class BusinessInvestmentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.businessInvestmentsListStore.shouldIFetch){
            this.props.businessInvestmentsListStore.getInvestments()
        }
        if(this.props.businessInvestmentsListStore.shouldIFetchAdvisors){
            this.props.businessInvestmentsListStore.getAdvisors()
        }

        if(this.props.businessInvestmentsListStore.shouldIFetchInvestors){
            this.props.businessInvestmentsListStore.getInvestors()
        }
    }

    render() {
        let {
            businessInvestmentsListStore
        } = this.props
        return (
            <div className="animated fadeIn full-width full-height flex flex-column align-items-center">
                
                <Paper className="width-99 ml-auto mr-auto mt-2">
                    <TableToolbar />
                    <Table aria-labelledby="tableTitle"  style={{ wordWrap: 'break-word' }}>
                        <TableHeader />
                        {   !businessInvestmentsListStore.imBusy && !businessInvestmentsListStore.imWithError && <TableBodyContainer /> }
                    </Table>

                    <TableStatusComponent
                        imBusy={businessInvestmentsListStore.imBusy} 
                        imWithError={businessInvestmentsListStore.imWithError} 
                        dataLength={businessInvestmentsListStore.investments.length}
                    />
                    
                    {   !businessInvestmentsListStore.imBusy && 
                        !businessInvestmentsListStore.imWithError && 
                        businessInvestmentsListStore.investments.length !== 0 && 
                            <Pagination />
                    }
                </Paper>

                <EditBusinessInvestmentsModal />

                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(BusinessInvestmentsList)