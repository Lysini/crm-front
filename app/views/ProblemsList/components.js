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

import {
    config
} from '@globals/config'

import { problemTypes } from '@globals/globals'

import { 
    ListHeader, 
    CommonTableHeader,
    FiltersPanel
} from '@uiparts'

const tableColumns = [
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Data zgłoszenia', className: "", sortable: true },
  { id: 'type', numeric: false, disablePadding: false, label: 'Typ problemu', className: "", sortable: true },
  { id: 'Opis problemu', numeric: false, disablePadding: false, label: 'Opis problemu', className: "", sortable: false },
  { id: 'fullName', numeric: false, disablePadding: false, label: 'Dane kontaktowe', className: "", sortable: true },
  { id: 'Dane nieruchomości', numeric: false, disablePadding: false, label: 'Dane nieruchomości', className: "width-30", sortable: false },
  { id: 'Załącznik', numeric: false, disablePadding: false, label: 'Załącznik', className: "", sortable: false }
];

const filtersConfig = () => {
    let _problemTypes = problemTypes.map((problemType) => {
        return {
            label: problemType.label,
            value: problemType.label
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
                propName: 'problemType',
                label: 'Typ Problemu',
                options: [..._problemTypes]
            }
        ]
    ]
}

export const TableHeader = inject("problemsListStore")(observer((props) => {
    const { 
        problemsListStore
    } = props;
    return (
        <CommonTableHeader 
            filters={problemsListStore.filters}
            changeSort={(sortingColumn) => problemsListStore.changeSort(sortingColumn)}
            columns={tableColumns}
        />
    );
}))

export const TableToolbar = inject("problemsListStore")(observer((props) => {
    const { 
        problemsListStore 
    } = props;

    return (
        <div className="flex flex-column full-width">
            <ListHeader 
                title={"Problemy"}
                isAnyFilter={problemsListStore.isAnyFilter}
                refresh={() => problemsListStore.getNeeds()}
                clearFilters={() => problemsListStore.clearFilters()}
                toggleFilterbar={() => problemsListStore.toggleFilterbar()}
            />

            <FiltersPanel 
                onChange={(propName, value) => problemsListStore.filters[propName] = value}
                expanded={problemsListStore.showFilters}
                filtersRows={filtersConfig()}
                filters={problemsListStore.filters}
                getData={() => problemsListStore.getNeeds()}
                imBusy={problemsListStore.imBusy}
                showSearch={true}
            />
        </div>
    )
}))

export const TableBodyContainer = inject("problemsListStore")(observer((props) => {
    let {
        problemsListStore
    } = props
    return (
        <TableBody>
            {problemsListStore.problems.map(problem => {
                return (
                    <TableRow
                        hover
                        onClick={() => {}}
                        aria-checked={false}
                        tabIndex={-1}
                        key={problem._id}
                    >
                        <TableCell className="text-nowrap table-padding">
                            {moment(new Date(problem.createdAt)).format('Do MMMM YYYY')}
                        </TableCell>

                        <TableCell className="table-padding">
                            {problem.type}
                        </TableCell>

                        <TableCell className="table-padding"  style={{maxWidth: '200px'}}>
                            {problem.description}
                        </TableCell>

                        <TableCell className="text-nowrap table-padding">
                            <div>{`${problem.contact.fullName}`}</div>
                            <div>{`Email: ${problem.contact.email}`}</div>
                            <div>{`Telefon: ${problem.contact.phoneNumber}`}</div>
                            { problem.nip &&
                                <div>{`NIP: ${problem.nip}`}</div>
                            }
                        </TableCell>

                        <TableCell className="table-padding">
                            { problem.estate ?
                                <div>
                                    <div>{`Typ: ${problem.estate.type}`}</div>
                                    {problem.estate.type === "Grunt" && <div>{`Typ gruntu: ${problem.estate.groundType}`}</div>}
                                    <div>{`Powierzchnia: ${problem.estate.area}m^2`}</div>
                                    <div>{`Adres: ${problem.estate.address}`}</div>
                                    <div>{`Zadłużenie: ${problem.estate.debet === "" ? "Brak" : problem.estate.debet}zł`}</div>
                                    {problem.estate.debet !== "" && 
                                        <div>{`Postępowanie windykacyjne: ${problem.estate.executionStatus}`}</div>
                                    }
                                    {problem.estate.executionStatus !== "Nie podjęto" && 
                                        <div>{`Data rozpoczęcia postępowania: ${moment(new Date(problem.estate.executionStartDate)).format('Do MMMM YYYY')}`}</div>
                                    }
                                </div>
                              : "Nie dotyczy"
                            }
                        </TableCell>

                        <TableCell className="table-padding">
                            { problem.file && 
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small"
                                    href={`${config.apiUrl}/needs/file/${problem.file.filename}/${problem.contact.fullName.trim().split(" ").join("-")}`}
                                >
                                    Zapisz
                                </Button>
                            }
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


export const Pagination = inject("problemsListStore")(observer((props) => {
    let {
        problemsListStore
    } = props
    return (
        <TablePagination
        rowsPerPageOptions={[100]}
        component="div"
        count={problemsListStore.totalCount}
        rowsPerPage={100}
        page={problemsListStore.filters.page}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
        backIconButtonProps={{
          'aria-label': 'Poprzednia strona',
        }}
        nextIconButtonProps={{
          'aria-label': 'Następna strona',
        }}
        onChangePage={(e) => problemsListStore.changePage(e)}
        onChangeRowsPerPage={() => {}}
      />
    )
}))