import React, { useContext, useEffect, useState } from 'react'
import pt from 'prop-types'
import { print } from 'graphql'
import { ClientContext } from 'graphql-hooks'

import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from '@material-ui/core'

import getQuery from '../lib/queryBuilder'
import convertToLongFormat from '../lib/tableDataConverter'
import DataTablePaginationActions from './DataTablePaginationActions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}))

const DataTable = ({ filterSelection = {} }) => {
  const classes = useStyles()
  const client = useContext(ClientContext)

  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const query = getQuery(filterSelection)
      const { data } = await client.request({ query: print(query) })
      setData(data)
    }

    if (filterSelection && filterSelection.statistic) {
      fetchData()
    } else {
      setData(null)
    }
  }, [filterSelection])

  const columnDefs = [
    {
      headerName: 'Region ID',
      field: 'regionId'
    },
    {
      headerName: 'Region Name',
      field: 'regionName'
    },
    {
      headerName: 'Jahr',
      field: 'year'
    },
    {
      headerName: 'Wert',
      field: 'value'
    }
  ].concat(
    (filterSelection &&
      filterSelection.args &&
      filterSelection.args
        .filter(a => a.selected.length !== 0)
        .map(a => ({
          headerName: a.label,
          field: a.value
        }))) ||
      []
  )

  const rowData =
    (filterSelection && convertToLongFormat(data, filterSelection.attribute)) ||
    []

  // TODO implement proper pagination
  const currentPageRowData = rowData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  )

  const handleChangePage = (event, page) => {
    setPage(page)
  }
  const handleChangeRowsPerPage = value => {
    setRowsPerPage(value.target.value)
  }
  const labelDisplayedRows = ({ from, to, count }) =>
    `${from}-${to} von ${count}`

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {columnDefs.map(def => (
                <TableCell key={def.headerName}>{def.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageRowData.map(row => (
              <TableRow key={row.name}>
                {columnDefs.map(def => (
                  <TableCell key={def.field}>{row[def.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rowData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Zeilen pro Seite' },
                  native: true
                }}
                labelDisplayedRows={labelDisplayedRows}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={DataTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </div>
  )
}

DataTable.propTypes = {
  // TODO
  // eslint-disable-next-line react/forbid-prop-types
  filterSelection: pt.object
}

export default DataTable
