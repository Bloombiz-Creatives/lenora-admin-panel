import { useEffect, useState } from "react";
import CustomButton from "../../../shared/CustomButton";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { editHomePageContent } from "../../../action/websiteAction";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';



const EditPageContent = ({ data}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [formData, setFormData] = useState({
        heading: '',
        text: '',
    });

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setFormData({
                heading: data?.heading || '',
                text: data?.text || '',
            });
        }
    }, [data]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSave = async () => {
        try {
            const form = new FormData();
            form.append("heading", formData.heading);
            form.append("text", formData.text);
            form.append("button", formData.button);
    
            await dispatch(editHomePageContent(data._id, form));
            enqueueSnackbar("Pagecontent edited Successfully", { variant: "success" });
            handleClose();
        } catch  {
            enqueueSnackbar("Failed to edit pagecontent.", { variant: "error" });
        }
    };

    return (
        <div>
            <CustomButton onClick={handleOpen}  />

            <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                    PageContent
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
                    <Box component="form" noValidate autoComplete="off">
                        <h3 className='text-[15px]'>Heading</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="heading"
                            type="text"
                            fullWidth
                            value={formData.heading}
                            onChange={handleInputChange}
                        />
                        <h3 className='text-[15px]'>Text</h3>
                        <TextField
                            margin="dense"
                            id="text"
                            type="text"
                            fullWidth
                            rows={4}
                            multiline
                            value={formData.text}
                            onChange={handleInputChange}
                        />
                       
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", paddingBottom: "20px" }}>
                    <Button
                        sx={{ backgroundColor: '#312e81', '&:hover': { backgroundColor: '#312e81' }, borderRadius: '10px' }}
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        sx={{ color: '#312e81', borderColor: '#312e81', borderRadius: '10px', '&:hover': { borderColor: '#312e81' } }}
                        variant="outlined" onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}


EditPageContent.propTypes = {
    data: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      heading: PropTypes.string,
      text: PropTypes.string,
    }),
  };

export default EditPageContent
