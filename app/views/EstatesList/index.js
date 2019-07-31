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
    EditEstateModal
} from './edit.estate.modal'

import {
    TableStatusComponent
} from '@uiparts'

import {
    buttonStyles
} from '@styles/button.styles'


@withRouter
@inject("estatesListStore")
@observer
class EstatesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.estatesListStore.shouldIFetch){
            this.props.estatesListStore.getEstates()
        }
    }

    render() {
        let {
            classes,
            estatesListStore
        } = this.props
        return (
            <div className="animated fadeIn full-width full-height flex flex-column align-items-center">
                
                <Paper className="width-99 ml-auto mr-auto mt-2">
                    <TableToolbar />
                    <Table aria-labelledby="tableTitle"  style={{ wordWrap: 'break-word' }}>
                        <TableHeader />
                        {   !estatesListStore.imBusy && !estatesListStore.imWithError && <TableBodyContainer /> }
                    </Table>

                    <TableStatusComponent
                        imBusy={estatesListStore.imBusy} 
                        imWithError={estatesListStore.imWithError} 
                        dataLength={estatesListStore.estates.length}
                    />
                    
                    {   !estatesListStore.imBusy && 
                        !estatesListStore.imWithError && 
                        estatesListStore.estates.length !== 0 && 
                            <Pagination />
                    }
                </Paper>

                <EditEstateModal />

                <SuccessSnackbar />
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(EstatesList)