import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import pt from 'prop-types'

import gql from 'graphql-tag'
import { ClientContext } from 'graphql-hooks'

const getQuery = ({ statistic, attribute, args }) => {
  const statisticsExpression = `statistics: [R${statistic}]`

  const valueAttributeArgumentsExpression = args.map(arg =>
    arg.values.length > 0
      ? `${arg.value}:[${arg.values.map(a => a.value).join(',')}]`
      : ''
  )

  const argumentsExpression = `(${valueAttributeArgumentsExpression
    .concat(statisticsExpression)
    .join(',')})`

  const valueAttributeFieldSelections = args.map(arg => arg.value).join('\n')

  const query = `
    {
        region(id: "13") {
            id
            name
            ${attribute}${argumentsExpression}{
                year
                value
                ${valueAttributeFieldSelections}
            }
        }
    }
`
  return gql`
    ${query}
  `
}

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

  useEffect(() => {
    const fetchData = async () => {
      const query = getQuery(filterSelection)
      const { data } = await client.request({ query })
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
      filterSelection.args.map(a => ({
        headerName: a.name,
        field: a.value
      }))) ||
      []
  )

  const rowData =
    (data && data.region && data.region[filterSelection.attribute]) || []

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
            {rowData.map(row => (
              <TableRow key={row.name}>
                {columnDefs.map(def => (
                  <TableCell key={def.field}>{row[def.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
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
