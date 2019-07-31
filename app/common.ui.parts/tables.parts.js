import React from 'react';
import { observer } from "mobx-react-lite"

import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import {
    ErrorPanel,
    InfoPanel
} from './info.panels'

export const CommonTableHeader = observer((props) => {
    const { 
        columns,
        changeSort,
        filters
    } = props;
    return (
        <TableHead>
            <TableRow>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        className={`${column.className} table-padding`}
                        padding={column.disablePadding ? 'none' : 'dense'}
                        sortDirection={filters.sortByColumn === column.id ? 'desc' : false}
                    >
                        { column.sortable 
                            ?
                                <Tooltip
                                    title="Zmień sortowanie"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={filters.sortByColumn === column.id}
                                        direction={filters.sortingDirection === 1 ? "asc" : "desc"}
                                        onClick={() => changeSort(column.id)}
                                    >
                                    {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            :
                            <Tooltip
                                title=""
                                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                            >
                                <TableSortLabel disabled>
                                    {column.label}
                                </TableSortLabel>
                            </Tooltip>
                        }
                    </TableCell>
                ),
                )}
            </TableRow>
        </TableHead>
    );
})


export const TableStatusComponent = observer((props) => {
    let {
        imBusy, 
        imWithError, 
        dataLength
    } = props
    if(imBusy){
        return (
            <div className="full-width flex align-items-center justify-content-center pt-3 pb-3">
                <CircularProgress size={60} disableShrink /> 
            </div>
        )
    } else {
        if(imWithError){
            return (
                <ErrorPanel message="Wystąpił nieoczekiwany błąd" /> 
            )
        } else {
            if(dataLength === 0){
                return (
                    <InfoPanel message="Nie znaleziono żadnych wyników" /> 
                )
            }
        }
    }
    return <div />
})