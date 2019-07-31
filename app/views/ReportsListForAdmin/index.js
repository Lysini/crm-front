import React from "react";
import { withRouter } from "react-router-dom";
import {
    inject, 
    observer
} from 'mobx-react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import {
    TableHeader,
    TableToolbar,
    TableBodyContainer,
    Pagination
} from './components'

import {
    ReportDetailsModal
} from './report.details.modal'

import {
    TableStatusComponent
} from '@uiparts'


@withRouter
@inject("reportsListForAdminStore")
@observer
class ReportsListForAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.reportsListForAdminStore.shouldIFetch){
            this.props.reportsListForAdminStore.getReports()
        }
    }

    render() {
        let {
            reportsListForAdminStore
        } = this.props
        return (
            <div className="animated fadeIn full-width full-height flex flex-column align-items-center">
                <Paper className="width-99 ml-auto mr-auto mt-2">
                    <TableToolbar />
                    <Table aria-labelledby="tableTitle">
                        <TableHeader />
                        {!reportsListForAdminStore.imBusy && !reportsListForAdminStore.imWithError && <TableBodyContainer /> }
                    </Table>

                    <TableStatusComponent
                        imBusy={reportsListForAdminStore.imBusy} 
                        imWithError={reportsListForAdminStore.imWithError} 
                        dataLength={reportsListForAdminStore.reports.length}
                    />

                    {   !reportsListForAdminStore.imBusy && 
                        !reportsListForAdminStore.imWithError &&
                        reportsListForAdminStore.reports.length !== 0 &&
                            <Pagination /> 
                    }
                </Paper>

                <ReportDetailsModal />
            </div>
        );
    }
} 

export default ReportsListForAdmin