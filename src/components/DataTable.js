import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
import LinearProgress from '@material-ui/core/LinearProgress'

import getQuery from '../lib/queryBuilder'
import convertToLongFormat from '../lib/tableDataConverter'
import DataTablePaginationActions from './DataTablePaginationActions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2)
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

const DataTable = ({ regions, statistics }) => {
  const classes = useStyles()
  const client = useContext(ClientContext)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // TODO support more than 1 statistic
      const statistic = Object.values(statistics)[0]
      const query = getQuery(regions, statistic)
      const { data } = await client.request({ query: print(query) })
      const rowData = convertToLongFormat(data, statistic.attributeCode) || []
      setData(rowData)
      setLoading(false)
    }

    if (Object.keys(statistics).length > 0 && regions.length > 0) {
      fetchData()
    } else {
      setData([])
    }
  }, [regions, statistics])

  // TODO support more than 1 statistic
  const args =
    Object.keys(statistics).length > 0 ? Object.values(statistics)[0].args : []

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
    (args &&
      args
        .filter(a => a.selected.length !== 0 && a.active)
        .map(a => ({
          headerName: a.label,
          field: a.value
        }))) ||
      []
  )

  // TODO implement proper pagination
  const currentPageRowData =
    data.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || []

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
        {loading && <LinearProgress variant="query" />}
        {!loading && (
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {columnDefs.map(def => (
                  <TableCell key={def.headerName}>{def.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageRowData.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {columnDefs.map(def => (
                      <TableCell key={def.field}>{row[def.field]}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 50, 100]}
                  colSpan={3}
                  count={data.length}
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
        )}
      </Paper>
    </div>
  )
}

DataTable.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.string),
  statistics: PropTypes.object
}

export default DataTable
