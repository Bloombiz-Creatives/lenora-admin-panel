import DropzoneImage from '../shared/DropzoneImage';
import { useState } from 'react';
import CustomButton from '../shared/CustomButton';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addBrands } from '../action/brandAction';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';


const AddBrands = ({ mode }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setData({ name: "", image: "" });
    setPreviewImage(null);
    setError({});
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setData({ ...data, image: file });
  };

  const validateInput = () => {
    let validationErrors = {
      name: data.name ? "" : "Brand name is required",
      image: data.image ? "" : "Brand image is required",
    };

    setError(validationErrors);
    return Object.values(validationErrors).every(value => !value);
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      try {
        const formData = new FormData();
        formData.append("name", data.name);

        if (data.image instanceof File) {
          formData.append("image", data.image);
        }
        await dispatch(addBrands(formData));
        enqueueSnackbar("Brand Added Successfully", { variant: "success" });
        handleClose();
      } catch  {
        enqueueSnackbar("Failed to process brand.", { variant: "error" });
      }
    }
  };

  return (
    <div>
      <CustomButton onClick={handleOpen} mode={mode} />
      <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
        <DialogTitle className='text-[24px] font-medium'>
          Brand
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
            <h3 className='text-[15px]'>Name</h3>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              error={!!error.name}
              helperText={error.name}
            />
            <div className='block w-full mt-4'>
              <p>Image</p>
              <DropzoneImage onChange={handleFileInputChange} image={previewImage} id={data._id}/>
              {error.image && <Typography color="error">{error.image}</Typography>}
            </div>
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
};

AddBrands.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default AddBrands;
