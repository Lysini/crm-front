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
    Pagination
} from './components'

import {
    TableStatusComponent
} from '@uiparts'

import {
    buttonStyles
} from '@styles/button.styles'


@withRouter
@inject("problemsListStore")
@observer
class ProblemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.problemsListStore.shouldIFetch){
            this.props.problemsListStore.getNeeds()
        }
    }

    render() {
        let {
            classes,
            problemsListStore
        } = this.props
        return (
            <div className="animated fadeIn full-width full-height flex flex-column align-items-center">
                <Paper className="width-99 ml-auto mr-auto mt-2">
                    <TableToolbar />
                    <Table aria-labelledby="tableTitle">
                        <TableHeader />
                        {!problemsListStore.imBusy && !problemsListStore.imWithError && <TableBodyContainer /> }
                    </Table>

                    <TableStatusComponent
                        imBusy={problemsListStore.imBusy} 
                        imWithError={problemsListStore.imWithError} 
                        dataLength={problemsListStore.problems.length}
                    />

                    {   !problemsListStore.imBusy && 
                        !problemsListStore.imWithError &&
                        problemsListStore.problems.length !== 0 &&
                            <Pagination /> 
                    }
                </Paper>
            </div>
        );
    }
} 

export default withStyles(buttonStyles)(ProblemsList)