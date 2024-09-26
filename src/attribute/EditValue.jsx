import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateAttributeValue } from '../action/attributeAction';
import PropTypes from 'prop-types';

const EditValue = ({ id, index, value }) => {
    const [open, setOpen] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const dispatch = useDispatch();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setEditedValue(value);
    }, [value]);

    const handleSubmit = () => {
        dispatch(updateAttributeValue(id, index, editedValue));
        handleClose();
    };

    return (
        <div>
            <FaEdit onClick={handleOpen} />

            <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                    Edit Value
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box component="form" autoComplete="off">
                        <h3 className='text-[15px]'>Value</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="value"
                            type="text"
                            fullWidth
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", paddingBottom: "20px" }}>
                    <Button
                        sx={{ backgroundColor: '#525b39', '&:hover': { backgroundColor: '#525b39' }, borderRadius: '10px' }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        sx={{ color: '#525b39', borderColor: '#525b39', borderRadius: '10px', '&:hover': { borderColor: '#525b39' } }}
                        variant="outlined" onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

EditValue.propTypes = {
    id: PropTypes.string,
    index: PropTypes.string,
    value: PropTypes.string,
  };

export default EditValue;
