import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


const ConfirmationModal = ({ delOpen, delHandleClose, onDelete }) => {
    return (
        <Dialog open={delOpen} onClose={delHandleClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', color: 'black' }}>
                    <CloseIcon fontSize="large" onClick={delHandleClose} className='cursor-pointer'/>
                </div>
            </DialogTitle>
            <DialogContent>
                <div style={{ textAlign: 'center' }}>
                    <h2>Are you sure?</h2>
                    <p>Do you really want to delete these records? This process cannot be undone.</p>
                </div>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center', marginBottom: 20 }}>
                <Button variant="outlined" onClick={delHandleClose} style={{ marginRight: 10 }}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={onDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmationModal.propTypes = {
    delOpen: PropTypes.bool.isRequired,  // Changed to boolean
    delHandleClose: PropTypes.func.isRequired,  // Changed to function
    onDelete: PropTypes.func.isRequired,  // Changed to function
};

export default ConfirmationModal;