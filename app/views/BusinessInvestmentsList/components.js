import React from 'react';
import {
    inject
} from 'mobx-react';
import {
    toJS
} from 'mobx';
import { observer } from "mobx-react-lite"

import moment from 'moment'
moment.locale('pl');

import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {
    config
} from '@globals/config'

import { 
    ListHeader, 
    CommonTableHeader, 
    SnackbarComponent,
    FiltersPanel 
} from '@uiparts'

const tableColumns = [
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Data Dodania', className: "", sortable: true },
    { id: 'investor', numeric: false, disablePadding: false, label: 'Inwestor', className: "", sortable: true },
    { id: 'value', numeric: true, disablePadding: false, label: 'Kwota', className: "", sortable: true },
    { id: 'advisor', numeric: false, disablePadding: false, label: 'Nadzorca', className: "", sortable: true },
    { id: 'conditions', numeric: false, disablePadding: false, label: 'Warunki', className: "", sortable: false },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Akcje', className: "", sortable: false },
];

const filtersConfig = (advisors) => {
    let _options = advisors.map((advisor) => {
        return {
            label: `${advisor.firstName} ${advisor.lastName}`,
            value: advisor._id
        }
    })
    return [
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
            },
            {
                type: 'select',
                propName: 'advisor',
                label: 'Opiekun',
                options: [..._options]
            }
        ]
    ]
}


export const TableHeader = inject("businessInvestmentsListStore")(observer((props) => {
    const { 
        businessInvestmentsListStore
    } = props;

    return (
        <CommonTableHeader 
            filters={businessInvestmentsListStore.filters}
            changeSort={(sortingColumn) => businessInvestmentsListStore.changeSort(sortingColumn)}
            columns={tableColumns}
        />
    );
}))

export const TableToolbar = inject("businessInvestmentsListStore")(observer((props) => {
    const { 
        businessInvestmentsListStore 
    } = props;

    return (
        <div className="flex flex-column full-width">
            <ListHeader 
                title={"Inwestycje"}
                isAnyFilter={businessInvestmentsListStore.isAnyFilter}
                refresh={() => businessInvestmentsListStore.getInvestments()}
                clearFilters={() => businessInvestmentsListStore.clearFilters()}
                toggleFilterbar={() => businessInvestmentsListStore.toggleFilterbar()}
            />

            <FiltersPanel 
                onChange={(propName, value) => businessInvestmentsListStore.filters[propName] = value}
                expanded={businessInvestmentsListStore.showFilters}
                filtersRows={filtersConfig(toJS(businessInvestmentsListStore.advisorsList))}
                filters={businessInvestmentsListStore.filters}
                getData={() => businessInvestmentsListStore.getInvestments()}
                imBusy={businessInvestmentsListStore.imBusy}
                showSearch={true}
            />
        </div>
    )
}))

export const TableBodyContainer = inject("businessInvestmentsListStore")(observer((props) => {
    let {
        businessInvestmentsListStore
    } = props
    return (
        <TableBody>
            {businessInvestmentsListStore.investments.map(investment => {
                return (
                    <TableRow
                        hover
                        onClick={() => {}}
                        aria-checked={false}
                        tabIndex={-1}
                        key={investment._id}
                    >
                        <TableCell className="table-padding">{moment(new Date(investment.createdAt)).format('Do MMMM YYYY')}</TableCell>
                        <TableCell className="table-padding">
                            {investment.investor ? `${investment.investor.firstName} ${investment.investor.lastName}` : "Brak"}
                        </TableCell>
                        <TableCell className="table-padding">
                            {`${investment.value} zł`}
                        </TableCell>
                        <TableCell className="table-padding">
                        {investment.advisor ? `${investment.advisor.firstName} ${investment.advisor.lastName}` : 'Brak'}
                        </TableCell>
                        <TableCell  style={{maxWidth: "250px"}} className="table-padding">
                            {`${investment.conditions}`}
                        </TableCell>
                        <TableCell className="table-padding" style={{width: "200px"}}>
                            <div className="flex flex-column">
                                <Button 
                                    fullWidth
                                    variant="contained" 
                                    className="custom-btn-success"
                                    color="primary" 
                                    size="small"
                                    onClick={() => businessInvestmentsListStore.toggleEditModal(investment)}
                                >
                                    Edytuj
                                </Button>

                                <Button 
                                    fullWidth
                                    variant="contained" 
                                    className="mt-2"
                                    color="primary" 
                                    size="small"
                                    href={`${config.apiUrl}/investment/file/${investment.file.filename}`}
                                >
                                    Pobierz biznesplan
                                </Button>
                            </div>
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


export const Pagination = inject("businessInvestmentsListStore")(observer((props) => {
    let {
        businessInvestmentsListStore
    } = props
    return (
        <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={businessInvestmentsListStore.totalCount}
            rowsPerPage={100}
            page={businessInvestmentsListStore.filters.page}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
            backIconButtonProps={{
                'aria-label': 'Poprzednia strona',
            }}
            nextIconButtonProps={{
                'aria-label': 'Następna strona',
            }}
            onChangePage={(e) => businessInvestmentsListStore.changePage(e)}
            onChangeRowsPerPage={() => {}}
      />
    )
}))


export const SuccessSnackbar = inject("businessInvestmentsListStore")(observer((props) => {
    let {
        businessInvestmentsListStore
    } = props

    return (
        <SnackbarComponent
            text={"Inwestycja zaktualizowana pomyślnie!"}
            open={businessInvestmentsListStore.showSuccessSnackbar}
            onClose={() => businessInvestmentsListStore.showSuccessSnackbar = false}
            color={"success"}
        />
    )
}))