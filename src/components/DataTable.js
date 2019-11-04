import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { print } from 'graphql'
import { ClientContext } from 'graphql-hooks'
import parse from 'url-parse'
import Highlight from 'react-highlight';

import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  LinearProgress,
  Tabs,
  Tab,
  Button
} from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import CallMadeIcon from '@material-ui/icons/CallMade'

import getQuery from '../lib/queryBuilder'
import convertToLongFormat from '../lib/tableDataConverter'
import DataTablePaginationActions from './DataTablePaginationActions'
import { withRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650,
    marginTop: theme.spacing(3)
  },
  tableTitle: {
    fontWeight: 'bold'
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  descriptionTab: {
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(3),
    marginLeft: theme.spacing(2)
  },
  exportTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(3),
    marginLeft: theme.spacing(2)
  },
  apiTab: {
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(3),
    marginLeft: theme.spacing(2)
  },
  exportButton: {
    marginTop: '0.3rem',
    height: '3rem'
  }
}))

const DataTable = ({ router, regions, measures }) => {
  const classes = useStyles()
  const client = useContext(ClientContext)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [page, setPage] = useState(0)
  const [tabValue, setTabValue] = useState(0)
  const [graphqlQuery, setGraphqlQuery] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // TODO support more than 1 measure
      const measure = Object.values(measures)[0]
      const query = getQuery(regions, measure)
      setGraphqlQuery(query)
      const { data } = await client.request({ query })
      const rowData = convertToLongFormat(data, measure.name) || []
      setData(rowData)
      setLoading(false)
    }

    if (Object.keys(measures).length > 0 && regions.length > 0) {
      fetchData()
    } else {
      setData([])
    }
  }, [regions, measures])

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
    (measures &&
    measures.length === 1 && // TODO support more than one measure
      measures[0].dimensions
        .filter(m => m.selected.length !== 0 && m.active)
        .map(m => ({
          headerName: m.titleDe,
          field: m.name
        }))) ||
      []
  )

  // TODO implement proper server-side pagination
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleDownload = (format, layout) => {
    // FIXME this is a hack, use proper API
    // e.g. implement GraphQL API and pass query object as variables
    const url = parse(router.asPath, false)
    if (url.query && window) {
      const tabularApiUrl = `https://tabular.genesapi.org${url.query}&format=${format}&layout=${layout}`
      window.open(tabularApiUrl, '_blank')
    }
  }

  // TODO improve this, best would be to get text in proper format (HTML?) from server
  const renderTextWithLineBreaks = text =>
    text.split('\n').map((item, i) => (
      <div key={i}>
        {item}
        <br />
      </div>
    ))

  return (
    <div className={classes.root}>
      {loading && <LinearProgress variant="query" />}
      {!loading && (
        <>
          <div className={classes.heading}>
            {measures && measures.length === 1 && (
              <Typography variant="h4">{measures[0].titleDe}</Typography>
            )}
            {measures && measures.length === 1 && (
              <Typography variant="subtitle1">
                {measures[0].statisticTitleDe}
              </Typography>
            )}
          </div>
          <Paper className={classes.paper}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
            >
              <Tab label="Daten" />
              <Tab label="Beschreibung" />
              <Tab label="Export" />
              <Tab label="API" />
            </Tabs>
            {tabValue === 0 && (
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    {columnDefs.map(def => (
                      <TableCell
                        className={classes.tableTitle}
                        key={def.headerName}
                      >
                        {def.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPageRowData.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {columnDefs.map(def => (
                          <TableCell key={def.field}>
                            {row[def.field]}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[100, 200, 500]}
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
            {tabValue === 1 && measures && measures.length === 1 && (
              <div className={classes.descriptionTab}>
                <Typography variant="h5">{measures[0].name}</Typography>
                {renderTextWithLineBreaks(measures[0].definitionDe)}
              </div>
            )}
            {tabValue === 2 && measures && measures.length === 1 && (
              <div className={classes.exportTab}>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  startIcon={<InsertDriveFileIcon />}
                  onClick={() => handleDownload('csv', 'long')}
                >
                  CSV: eine Zeile pro Wert
                </Button>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  startIcon={<InsertDriveFileIcon />}
                  onClick={() => handleDownload('csv', 'region')}
                >
                  CSV: eine Zeile pro Region
                </Button>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  startIcon={<InsertDriveFileIcon />}
                  onClick={() => handleDownload('csv', 'time')}
                >
                  CSV: eine Zeile pro Jahr
                </Button>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  startIcon={<InsertDriveFileIcon />}
                  onClick={() => handleDownload('json', 'long')}
                >
                  JSON: Ein Objekt pro Wert
                </Button>
              </div>
            )}
            {tabValue === 3 && measures && measures.length === 1 && (
              <div className={classes.apiTab}>
                <Typography variant="h5">GraphQL Abfrage zu aktueller Statistik:</Typography>
                <Highlight className="graphql">{graphqlQuery}</Highlight>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  target="_blank"
                  href="http://api.datengui.de/graphql"
                  startIcon={<CallMadeIcon />}
                  onClick={() => handleDownload('json', 'long')}
                >
                  GraphQL Playground öffnen
                </Button>
              </div>

            )}
          </Paper>
        </>
      )}
    </div>
  )
}

DataTable.propTypes = {
  router: PropTypes.object.isRequired,
  regions: PropTypes.arrayOf(PropTypes.object),
  measures: PropTypes.arrayOf(PropTypes.object)
}

export default withRouter(DataTable)
