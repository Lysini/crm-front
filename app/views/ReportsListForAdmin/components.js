import React from 'react';
import {
    inject,
    observer
} from 'mobx-react';

import moment from 'moment'
moment.locale('pl');

import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {  } from '@globals/globals'

import { 
    ListHeader, 
    CommonTableHeader,
    FiltersPanel
} from '@uiparts'

import { convertReportStatus } from '@utils'

const tableColumns = [
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Wysłano', className: "", sortable: true },
  { id: 'reportedDay', numeric: false, disablePadding: false, label: 'Raport dnia', className: "", sortable: true },
  { id: 'worker', numeric: false, disablePadding: false, label: 'Pracownik', className: "", sortable: false },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', className: "", sortable: true },
  { id: 'Akcje', numeric: false, disablePadding: false, label: 'Akcje', className: "width-30", sortable: false }
];

const filtersConfig = () => {
    return [
        [
            {
                type: 'date',
                propName: 'minCreatedDate',
                label: 'Wysłane od'
            },
            {
                type: 'date',
                propName: 'maxCreatedDate',
                label: 'Wysłane do'
            }
        ],
        [
            {
                type: 'date',
                propName: 'minReportedDay',
                label: 'Raport dnia od'
            },
            {
                type: 'date',
                propName: 'maxReportedDay',
                label: 'Raport dnia do'
            }
        ]
    ]
}

export const TableHeader = inject("reportsListForAdminStore")(observer((props) => {
    const { 
        reportsListForAdminStore
    } = props;
    return (
        <CommonTableHeader 
            filters={reportsListForAdminStore.filters}
            changeSort={(sortingColumn) => reportsListForAdminStore.changeSort(sortingColumn)}
            columns={tableColumns}
        />
    );
}))

export const TableToolbar = inject("reportsListForAdminStore")(observer((props) => {
    const { 
        reportsListForAdminStore 
    } = props;

    return (
        <div className="flex flex-column full-width">
            <ListHeader 
                title={"Raporty Pracowników"}
                isAnyFilter={reportsListForAdminStore.isAnyFilter}
                refresh={() => reportsListForAdminStore.getReports()}
                clearFilters={() => reportsListForAdminStore.clearFilters()}
                toggleFilterbar={() => reportsListForAdminStore.toggleFilterbar()}
            />

            <FiltersPanel 
                onChange={(propName, value) => reportsListForAdminStore.filters[propName] = value}
                expanded={reportsListForAdminStore.showFilters}
                filtersRows={filtersConfig()}
                filters={reportsListForAdminStore.filters}
                getData={() => reportsListForAdminStore.getReports()}
                imBusy={reportsListForAdminStore.imBusy}
                showSearch={true}
            />
        </div>
    )
}))

export const TableBodyContainer = inject("reportsListForAdminStore")(observer((props) => {
    let {
        reportsListForAdminStore
    } = props
    return (
        <TableBody>
            {reportsListForAdminStore.reports.map(report => {
                return (
                    <TableRow
                        hover
                        onClick={() => {}}
                        aria-checked={false}
                        tabIndex={-1}
                        key={report._id}
                    >
                        <TableCell className="text-nowrap table-padding">
                            {moment(new Date(report.createdAt)).format('Do MMMM YYYY')}
                        </TableCell>

                        <TableCell className="text-nowrap table-padding">
                            {moment(new Date(report.reportedDay)).format('Do MMMM YYYY')}
                        </TableCell>

                        <TableCell className="table-padding">
                            {`${report.worker.firstName} ${report.worker.lastName}`}
                        </TableCell>

                        <TableCell className="table-padding">
                            {convertReportStatus(report.status)}
                        </TableCell>

                        <TableCell className="table-padding">
                            <div className="flex flex-column">
                                <Button 
                                    fullWidth
                                    variant="contained" 
                                    className="custom-btn-success"
                                    color="primary" 
                                    size="small"
                                    onClick={() => reportsListForAdminStore.toggleDetailsModal(report)}
                                >
                                    Szczegóły
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            })}
            <TableRow style={{ height: 49 * 0 }}>
                <TableCell colSpan={6} />
            </TableRow>
        </TableBody>
    )
}))


export const Pagination = inject("reportsListForAdminStore")(observer((props) => {
    let {
        reportsListForAdminStore
    } = props
    return (
        <TablePagination
        rowsPerPageOptions={[100]}
        component="div"
        count={reportsListForAdminStore.totalCount}
        rowsPerPage={100}
        page={reportsListForAdminStore.filters.page}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
        backIconButtonProps={{
          'aria-label': 'Poprzednia strona',
        }}
        nextIconButtonProps={{
          'aria-label': 'Następna strona',
        }}
        onChangePage={(e) => reportsListForAdminStore.changePage(e)}
        onChangeRowsPerPage={() => {}}
      />
    )
}))