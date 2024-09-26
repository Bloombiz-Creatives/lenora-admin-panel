import { Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { editAttribute } from '../action/attributeAction';
import PropTypes from 'prop-types';


const EditName = ({ id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [data, setData] = useState({
        name: "",
    });
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { attribute } = useSelector((state) => state.attributeState);

    useEffect(() => {
        const attributeToEdit = attribute?.attribute.find(at => at._id === id);
        if (attributeToEdit) {
            setData({
                name: attributeToEdit.name,
            });
        }
    }, [id, attribute?.attribute]);

    const handleSubmit = async () => {
        if (!data.name.trim()) {
            enqueueSnackbar("Name is required", { variant: "error" });
            return;
        }

        try {
            // Assuming your editAttribute action accepts an object with id and data
            await dispatch(editAttribute(id, { name: data.name }));
            enqueueSnackbar("Attribute edited successfully!", { variant: "success" });
            handleClose();
        } catch (error) {
            enqueueSnackbar(`Failed to edit attribute: ${error.message}`, { variant: "error" });
        }
    };

    return (
        <div>
            <Edit fontSize="small" onClick={handleOpen} />

            <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                    Edit Name
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
                        <h3 className='text-[15px]'>Name</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            value={data.name}
                            onChange={(e) => setData({ name: e.target.value })}
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

EditName.propTypes = {
    id: PropTypes.string,
  };

export default EditName;
