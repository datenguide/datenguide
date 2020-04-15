// import { makeStyles } from '@material-ui/core/styles'
import DataTablePaginationActions from './DataTablePaginationActions'
import { TablePagination } from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }))

const labelDisplayedRows = ({ from, to, count }) => `${from}-${to} von ${count}`

const DataTablePagination = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  // const classes = useStyles()

  return (
    <TablePagination
      rowsPerPageOptions={[100, 200, 500]}
      colSpan={6}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'Zeilen pro Seite' },
        native: true,
      }}
      labelDisplayedRows={labelDisplayedRows}
      labelRowsPerPage="Datensätze pro Seite: "
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={DataTablePaginationActions}
    />
  )
}

DataTablePagination.propTypes = {}

export default DataTablePagination
