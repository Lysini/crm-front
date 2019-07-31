import React from 'react';
import {
    inject
} from 'mobx-react';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { estateTypes, groundTypes, executionStatuses } from '@globals/globals'


import { 
    ListHeader, 
    CommonTableHeader, 
    SnackbarComponent,
    FiltersPanel 
} from '@uiparts'

const tableColumns = [
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Data Dodania', className: "", sortable: true },
    { id: 'type', numeric: false, disablePadding: false, label: 'Typ nieruchomości', className: "", sortable: true },
    { id: 'groundType', numeric: false, disablePadding: false, label: 'Typ gruntu', className: "", sortable: true },
    { id: 'area', numeric: true, disablePadding: false, label: 'Powierzchnia', className: "", sortable: true },
    { id: 'address', numeric: false, disablePadding: false, label: 'Adres', className: "", sortable: false },
    { id: 'debet', numeric: true, disablePadding: false, label: 'Zadłużenie', className: "", sortable: true },
    { id: 'executionStatus', numeric: false, disablePadding: false, label: 'Status windykacji', className: "", sortable: true },
    { id: 'executionStartDate', numeric: false, disablePadding: false, label: 'Rozpoczęcie windykacji', className: "", sortable: true },
    { id: 'description', numeric: false, disablePadding: false, label: 'Opis', className: "", sortable: false },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Akcje', className: "", sortable: false },
];

const filtersConfig = (advisors) => {
    let _estateTypes = estateTypes.map((type) => {
        return {
            label: type,
            value: type
        }
    })
    let _groundTypes = groundTypes.map((type) => {
        return {
            label: type,
            value: type
        }
    })
    let _executionStatuses = executionStatuses.map((status) => {
        return {
            label: status,
            value: status
        }
    })
    return [
        [
            {
                type: 'select',
                propName: 'type',
                label: 'Typ nieruchomości',
                options: [..._estateTypes]
            },
            {
                type: 'select',
                propName: 'groundType',
                label: 'Typ gruntu',
                options: [..._groundTypes]
            },
            {
                type: 'select',
                propName: 'executionStatus',
                label: 'Status egzekucji',
                options: [..._executionStatuses]
            }
        ],
        [
            {
                type: 'date',
                propName: 'minCreatedDate',
                label: 'Dodane od'
            },
            {
                type: 'date',
                propName: 'maxCreatedDate',
                label: 'Dodane do'
            }
        ],
        [
            {
                type: 'date',
                propName: 'minExecutionStartedDate',
                label: 'Proces windykacyjny od'
            },
            {
                type: 'date',
                propName: 'maxExecutionStartedDate',
                label: 'Proces windykacyjny do'
            }
        ]
    ]
}

export const TableHeader = inject("estatesListStore")(observer((props) => {
    const { 
        estatesListStore
    } = props;

    return (
        <CommonTableHeader 
            filters={estatesListStore.filters}
            changeSort={(sortingColumn) => estatesListStore.changeSort(sortingColumn)}
            columns={tableColumns}
        />
    );
}))

export const TableToolbar = inject("estatesListStore")(observer((props) => {
    const { 
        estatesListStore 
    } = props;
    
    return (
        <div className="flex flex-column full-width">
            <ListHeader 
                title={"Nieruchomosci"}
                isAnyFilter={estatesListStore.isAnyFilter}
                refresh={() => estatesListStore.getEstates()}
                clearFilters={() => estatesListStore.clearFilters()}
                toggleFilterbar={() => estatesListStore.toggleFilterbar()}
            />

            <FiltersPanel 
                onChange={(propName, value) => estatesListStore.filters[propName] = value}
                expanded={estatesListStore.showFilters}
                filtersRows={filtersConfig()}
                filters={estatesListStore.filters}
                getData={() => estatesListStore.getEstates()}
                imBusy={estatesListStore.imBusy}
                showSearch={true}
            />
        </div>
    )
}))

export const TableBodyContainer = inject("estatesListStore")(observer((props) => {
    let {
        estatesListStore
    } = props
    return (
        <TableBody>
            {estatesListStore.estates.map(estate => {
                return (
                    <TableRow
                        hover
                        onClick={() => {}}
                        aria-checked={false}
                        tabIndex={-1}
                        key={estate._id}
                    >
                        <TableCell className="table-padding">{moment(new Date(estate.createdAt)).format('Do MMMM YYYY')}</TableCell>
                        <TableCell className="table-padding">
                            {`${estate.type}`}
                        </TableCell>
                        <TableCell className="table-padding">
                            {estate.groundType ? `${estate.groundType}` : "Nie dotyczy"}
                        </TableCell>
                        <TableCell className="table-padding">
                            {`${estate.area}m^2`}
                        </TableCell>
                        <TableCell className="table-padding">
                            {`${estate.address}`}
                        </TableCell>
                        <TableCell className="table-padding">
                            {estate.debet ? `${estate.debet}zł` : "Brak"}
                        </TableCell>
                        <TableCell className="table-padding">
                            {estate.executionStatus ? `${estate.executionStatus}` : "Nie podjęto"}
                        </TableCell>
                        <TableCell className="table-padding">
                            {estate.executionStartDate ? `${estate.executionStartDate}` : "Nie dotyczy"}
                        </TableCell>
                        <TableCell className="table-padding" style={{maxWidth: "200px"}}>
                            {estate.description}
                        </TableCell>
                        <TableCell className="table-padding">
                            <Button 
                                variant="contained" 
                                className="custom-btn-success"
                                color="primary" 
                                size="small"
                                onClick={() => estatesListStore.toggleEditModal(estate)}
                            >
                                Edytuj
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })}
            <TableRow style={{ height: 49 * 0 }}>
                <TableCell colSpan={12} />
            </TableRow>
        </TableBody>
    )
}))


export const Pagination = inject("estatesListStore")(observer((props) => {
    let {
        estatesListStore
    } = props
    return (
        <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={estatesListStore.totalCount}
            rowsPerPage={100}
            page={estatesListStore.filters.page}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
            backIconButtonProps={{
                'aria-label': 'Poprzednia strona',
            }}
            nextIconButtonProps={{
                'aria-label': 'Następna strona',
            }}
            onChangePage={(e) => estatesListStore.changePage(e)}
            onChangeRowsPerPage={() => {}}
      />
    )
}))


export const SuccessSnackbar = inject("estatesListStore")(observer((props) => {
    let {
        estatesListStore
    } = props

    return (
        <SnackbarComponent
            text={"Nieruchomość zaktualizowana pomyślnie!"}
            open={estatesListStore.showSuccessSnackbar}
            onClose={() => estatesListStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))