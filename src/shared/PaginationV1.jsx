
import { TablePagination } from '@mui/material';
import PropTypes from 'prop-types';

const PaginationV1 = ({ pagination, onPageChange, rowsPerPage = 10}) => {
  if (!pagination || typeof pagination.totalCount === 'undefined' || typeof pagination.currentPage === 'undefined') {
    return null; 
  }

  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={pagination.totalCount}
        rowsPerPage={rowsPerPage}
        page={Math.max(0, pagination.currentPage - 1)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

PaginationV1.propTypes = {
  pagination: PropTypes.shape({
    totalCount: PropTypes.number,
    currentPage: PropTypes.number
  }),
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number
};

export default PaginationV1;