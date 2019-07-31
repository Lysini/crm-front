import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export const GenericTable = (props) => {
    let {
        columns,
        data
    } = props
    return (
        <div className="flex-column">
            <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                <Filters />
                <PaginationBar />
            </div>
            <Table>
                <Head columns={columns} />
                <Body columns={columns} data={data} />
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </div>
    )
}


const Head = (props) => {
    let {
        columns
    } = props
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((column, k) => {
                        return (
                            <TableCell 
                                key={k}
                                align={column.label_align}
                            >{column.label}</TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}

const Body = (props) => {
    let {
        data,
        columns
    } = this.props
    return (
        <TableBody>
            {
                data.map((row, k) => {
                    return (
                        <TableRow key={k}>
                            { 
                                columns.map((column, l) => {
                                    return (
                                        <TableCell 
                                            key={l} 
                                            align={column.align}
                                        >
                                            {row[column.prop_name]}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}

const Filters = () => {
    return (
        <div></div>
    )
}

const PaginationBar = () => {
    return (
        <div></div>
    )
}