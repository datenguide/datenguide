import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { ClientContext } from 'graphql-hooks'
import Highlight from 'react-highlight'
import querystring from 'query-string'

import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
  LinearProgress,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

import getQuery from '../../lib/queryBuilder'
import DataTableToolbar from './DataTableToolbar'
import DataTablePagination from './DataTablePagination'
import { useRouter } from 'next/router'

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
    display: 'flex',
    flexDirection: 'column',
  },
  loadingIndicator: {
    height: '16px',
  },
  tableSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    flexGrow: 1,
  },
  tableWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  error: {
    flex: '1 0 auto',
    padding: theme.spacing(4, 2, 6, 2),
  },
  tableBody: {
    flexGrow: '1 0 auto',
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    fontSize: '14px',
  },
  cell: {
    fontSize: '14px',
  },
  apiTab: {
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  apiHeading: {
    marginBottom: theme.spacing(3),
  },
  apiUrl: {
    margin: theme.spacing(2, 0),
  },
  exportButton: {
    marginTop: '0.3rem',
    height: '3rem',
  },
  alert: {
    margin: '0px 20px',
  },
}))

const DataTable = ({
  regions,
  measures,
  labels,
  layout,
  dispatch,
  actions,
  queryArgs,
}) => {
  const classes = useStyles()
  // const client = useContext(ClientContext)

  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [graphqlQuery, setGraphqlQuery] = useState(null)

  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [page, setPage] = useState(0)

  const router = useRouter()

  const handleChangePage = (event, page) => {
    setPage(page)
  }
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value.target.value)
  }

  const getTabularApiUrl = () => {
    return `https://tabular.genesapi.org?${querystring.stringify(router.query)}`
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // // TODO support more than 1 measure
      const measure = Object.values(measures)[0]

      // Fixes the rare case, that "data" key was not present
      if (
        Object.keys(router.query).includes('') &&
        !Object.keys(router.query).includes('data')
      ) {
        router.query.data = measure.id
        delete router.query['']
      }

      const query = getQuery(
        regions,
        measure,
        labels,
        layout,
        page,
        rowsPerPage
      )

      setGraphqlQuery(query)
      // const response = await client.request({ query })
      // const { data, error } = response
      // if (error) {
      //   const fetchError = error.fetchError && error.fetchError.statusText
      //   const httpError = error.httpError && error.httpError.statusText
      //   const graphQLError =
      //     error.graphQLErrors &&
      //     error.graphQLErrors.map((e) => e.message).join('\n')
      //   setData([])
      //   setError([fetchError, httpError, graphQLError].join(' ').trim())
      // } else if (data && data.table) {
      //   setData(data.table)
      //   setError(null)
      // } else {
      //   setError(ERROR_MESSAGE)
      // }

      try {
        const result = await fetch(
          `/api/tabular?${querystring.stringify(router.query)}`
        )
        const json = await result.json()
        setError(null)
        setData(json)
      } catch (e) {
        setError((e && e.toString()) || 'API-Abfrage fehlgeschlagen.')
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const count = (data && data.data && data.data.length) || 0

  // TODO implement proper server-side pagination
  const currentPageRowData =
    (data &&
      data.data &&
      data.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)) ||
    []

  const getDownloadFilename = () =>
    `${measures
      .map((m) => m.statisticTitleDe)
      .join('-')
      .replace(/\s/g, '-')}-${regions
      .map((r) => r.name)
      .join('-')
      .replace(/\s/g, '-')
      .replace(/,/g, '')}`

  return (
    <div className={classes.root}>
      {((currentPageRowData && currentPageRowData.length > 0) || error) && (
        <Paper className={classes.paper} elevation={1}>
          <>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
            >
              <Tab label="Tabelle" />
              <Tab label="API" />
            </Tabs>
          </>
          {tabValue === 0 && (
            <>
              <div className={classes.loadingIndicator}>
                {loading && <LinearProgress variant="query" />}
              </div>
              <div className={classes.tableSection}>
                <DataTableToolbar
                  measures={measures}
                  regions={regions}
                  labels={labels}
                  layout={layout}
                  dispatch={dispatch}
                  actions={actions}
                  queryArgs={queryArgs}
                  filename={getDownloadFilename()}
                />
                {error && (
                  <div className={classes.error}>
                    <Alert className={classes.alert} severity="error">
                      <AlertTitle>{ERROR_MESSAGE}</AlertTitle>
                      {error}
                    </Alert>
                  </div>
                )}

                <div className={classes.tableWrapper}>
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
                    <TableBody className={classes.tableBody}>
                      {!error &&
                        currentPageRowData.map((row, index) => {
                          return (
                            <TableRow key={index}>
                              {columnDefs.map((def) => (
                                <TableCell
                                  key={def.field}
                                  className={classes.cell}
                                >
                                  {row[def.field]}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <DataTablePagination
                          rowsPerPage={rowsPerPage}
                          page={page}
                          count={count}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </>
          )}
          {tabValue === 1 && measures && (
            <div className={classes.apiTab}>
              <Typography variant="h4" className={classes.apiHeading}>
                Mit der Datenguide API kannst du direkt auf die Daten der
                aktuellen Statistik zugreifen:
              </Typography>
              <Typography variant="h5">REST</Typography>
              <div className={classes.apiUrl}>
                <a href={getTabularApiUrl()}>{getTabularApiUrl()}</a>
              </div>
              <Typography variant="h5">GraphQL</Typography>
              <Highlight className="graphql">{graphqlQuery}</Highlight>
              <Button
                color="secondary"
                className={classes.exportButton}
                target="_blank"
                href={`http://api.datengui.de/graphql?query=${encodeURI(
                  graphqlQuery
                )}`}
                startIcon={<CallMadeIcon />}
              >
                GraphQL Playground öffnen
              </Button>
            </div>
          )}
        </Paper>
      )}
    </div>
  )
}

DataTable.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.object),
  measures: PropTypes.arrayOf(PropTypes.object),
  labels: PropTypes.string.isRequired,
}

export default DataTable
