import DataTablePaginationActions from './DataTablePaginationActions'
import { TablePagination } from '@material-ui/core'

const labelDisplayedRows = ({ from, to, count }) => `${from}-${to} von ${count}`

const DataTablePagination = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <TablePagination
    rowsPerPageOptions={[100, 200, 500]}
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

DataTablePagination.propTypes = {}

export default DataTablePagination
