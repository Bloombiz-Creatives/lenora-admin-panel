import { Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { editColor } from "../action/colorAction";
import PropTypes from 'prop-types';



const EditColor = ({ id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState({
        name: "",
        color_code: "",
    });

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { color } = useSelector((state) => state.colorState);

    useEffect(() => {
        const colorToEdit = color?.color.find(at => at._id === id);
        if (colorToEdit) {
            setData({
                name: colorToEdit.name,
                color_code: colorToEdit.color_code,
            });
        }
    }, [id, color?.color]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("color_code", data.color_code);
    
        try {
            await dispatch(editColor(id, formData));
            enqueueSnackbar("Color edited successfully!", { variant: "success" });
            handleClose();
        } catch (error) {
            enqueueSnackbar(`Failed to edit color: ${error.message}`, { variant: "error" });
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
                            onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
                            />

                        <h3 className='text-[15px]'>Color code</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="color_code"
                            type="text"
                            fullWidth
                            value={data.color_code}
                            onChange={(e) => setData(prevData => ({ ...prevData, color_code: e.target.value }))}
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
    )
}

EditColor.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditColor
