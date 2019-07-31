import React from 'react';
import {
    inject, 
    observer
} from 'mobx-react';

import moment from 'moment'
moment.locale('pl');

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import { 
    ListHeader, 
    CommonTableHeader,
    FiltersPanel
} from '@uiparts'

const tableColumns = [
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Data Dodania', className: "", sortable: true },
    { id: 'fullName', numeric: false, disablePadding: false, label: 'Imie i nazwisko', className: "", sortable: true },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-mail', className: "", sortable: true },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Numer kontaktowy', className: "", sortable: true },
    { id: 'Opis warunków', numeric: false, disablePadding: false, label: 'Opis warunków', className: "", sortable: false },
];

export const TableHeader = inject("investorsListStore")(observer((props) => {
    const { 
        investorsListStore
    } = props;

    return (
        <CommonTableHeader 
            filters={investorsListStore.filters}
            changeSort={(sortingColumn) => investorsListStore.changeSort(sortingColumn)}
            columns={tableColumns}
        />
    );
}))

const filtersConfig = [
    [
        {
            type: 'date',
            propName: 'minCreatedDate',
            label: 'Dodani od'
        },
        {
            type: 'date',
            propName: 'maxCreatedDate',
            label: 'Dodani do'
        }
    ]
]


export const TableToolbar = inject("investorsListStore")(observer((props) => {
    const { 
        investorsListStore 
    } = props;
    return (
        <div className="flex flex-column full-width">
            <ListHeader 
                title={"Inwestorzy"}
                isAnyFilter={investorsListStore.isAnyFilter}
                refresh={() => investorsListStore.getInvestors()}
                clearFilters={() => investorsListStore.clearFilters()}
                toggleFilterbar={() => investorsListStore.toggleFilterbar()}
            />
            
            <FiltersPanel 
                onChange={(propName, value) => investorsListStore.filters[propName] = value}
                expanded={investorsListStore.showFilters}
                filtersRows={filtersConfig}
                filters={investorsListStore.filters}
                getData={() => investorsListStore.getInvestors()}
                imBusy={investorsListStore.imBusy}
                showSearch={true}
            />
        </div>
    )
}))

export const TableBodyContainer = inject("investorsListStore")(observer((props) => {
    let {
        investorsListStore
    } = props
    return (
        <TableBody>
            {investorsListStore.investors.map(investor => {
                return (
                    <TableRow
                        hover
                        onClick={() => {}}
                        aria-checked={false}
                        tabIndex={-1}
                        key={investor._id}
                    >
                        <TableCell className="table-padding">{moment(new Date(investor.createdAt)).format('Do MMMM YYYY')}</TableCell>
                        <TableCell className="table-padding" component="th" scope="row">
                            {`${investor.firstName} ${investor.lastName}`}
                        </TableCell>
                        <TableCell className="table-padding">{investor.email}</TableCell>
                        <TableCell className="table-padding">{investor.phoneNumber}</TableCell>
                        <TableCell className="table-padding" style={{maxWidth: '200px'}}>{investor.description && investor.description}</TableCell>
                    </TableRow>
                );
            })}
            <TableRow style={{ height: 49 * 0 }}>
                <TableCell colSpan={6} />
            </TableRow>
        </TableBody>
    )
}))


export const Pagination = inject("investorsListStore")(observer((props) => {
    let {
        investorsListStore
    } = props
    return (
        <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={investorsListStore.totalCount}
            rowsPerPage={100}
            page={investorsListStore.filters.page}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
            backIconButtonProps={{
                'aria-label': 'Poprzednia strona',
            }}
            nextIconButtonProps={{
                'aria-label': 'Następna strona',
            }}
            onChangePage={(e) => investorsListStore.changePage(e)}
            onChangeRowsPerPage={() => {}}
      />
    )
}))