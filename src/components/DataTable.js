import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ClientContext } from 'graphql-hooks'
import Highlight from 'react-highlight'
import { withRouter } from 'next/router'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
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
  Button,
} from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'
import Alert from '@material-ui/lab/Alert'
import Toolbar from '@material-ui/core/Toolbar'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import GridOnIcon from '@material-ui/icons/GridOn'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'
import TextFormatIcon from '@material-ui/icons/TextFormat'
import AppsIcon from '@material-ui/icons/Apps'

import getQuery from '../lib/queryBuilder'
import DataTablePaginationActions from './DataTablePaginationActions'

// TODO create i8n label
const ERROR_MESSAGE = 'Die Daten konnten nicht geladen werden.'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tableTitle: {
    fontWeight: 'bold',
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  apiTab: {
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  exportButton: {
    marginTop: '0.3rem',
    height: '3rem',
  },
  alert: {
    margin: '0px 20px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const DataTable = ({ router, regions, measures }) => {
  const classes = useStyles()
  const client = useContext(ClientContext)

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
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
      const query = getQuery(regions, measure, page, rowsPerPage)
      setGraphqlQuery(query)
      const response = await client.request({ query })
      const { data, error } = response
      if (error) {
        const fetchError = error.fetchError && error.fetchError.statusText
        const httpError = error.httpError && error.httpError.statusText
        const graphQLError = error.graphQLError && error.graphQLError.statusText
        setData([])
        setError(
          `${ERROR_MESSAGE} (${[fetchError, httpError, graphQLError].join(
            ' '
          )})`
        )
      } else if (data && data.table) {
        setData(data.table)
        setError(null)
      } else {
        setError(ERROR_MESSAGE)
      }
      setLoading(false)
    }

    if (Object.keys(measures).length > 0 && regions.length > 0) {
      fetchData()
    } else {
      setData([])
    }
  }, [regions, measures, rowsPerPage, page])

  const columnDefs =
    (data.schema &&
      data.schema.fields
        .filter((f) => f.name !== 'index')
        .map((f) => ({ headerName: f.name, field: f.name }))) ||
    []

  const handleChangePage = (event, page) => {
    setPage(page)
  }
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value.target.value)
  }
  const labelDisplayedRows = ({ from, to, count }) =>
    `${from}-${to} von ${count}`

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const rows = (data && data.data) || []
  const total = (data && data.pagination && data.pagination.total) || 0

  return (
    <div className={classes.root}>
      {loading && <LinearProgress variant="query" />}
      {!loading && (
        <>
          <Paper className={classes.paper}>
            <>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
              >
                <Tab label="Daten" />
                <Tab label="API" />
              </Tabs>
              <Toolbar
                variant="dense"
                disableGutters
                className={classes.toolbar}
              >
                <Button>
                  <ViewColumnIcon />
                  Spalten
                  <ArrowDropDownIcon />
                </Button>
                <Button>
                  <AppsIcon />
                  Layout
                  <ArrowDropDownIcon />
                </Button>
                <Button>
                  <TextFormatIcon />
                  Beschriftung
                  <ArrowDropDownIcon />
                </Button>
                <Button>
                  <SaveAltIcon />
                  Download
                  <ArrowDropDownIcon />
                </Button>
              </Toolbar>
            </>
            {tabValue === 0 && (
              <>
                <Table className={classes.table} size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columnDefs.map((def) => (
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
                    {error && (
                      <Alert className={classes.alert} severity="error">
                        {error}
                      </Alert>
                    )}
                    {!error &&
                      rows.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            {columnDefs.map((def) => (
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
                        colSpan={6}
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'Zeilen pro Seite' },
                          native: true,
                        }}
                        labelDisplayedRows={labelDisplayedRows}
                        labelRowsPerPage="Datensätze pro Seite: "
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={DataTablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </>
            )}
            {tabValue === 1 && measures && measures.length === 1 && (
              <div className={classes.apiTab}>
                <Typography variant="h5">
                  GraphQL Abfrage zu aktueller Statistik:
                </Typography>
                <Highlight className="graphql">{graphqlQuery}</Highlight>
                <Button
                  color="secondary"
                  className={classes.exportButton}
                  target="_blank"
                  href="http://api.datengui.de/graphql"
                  startIcon={<CallMadeIcon />}
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
  measures: PropTypes.arrayOf(PropTypes.object),
}

export default withRouter(DataTable)
