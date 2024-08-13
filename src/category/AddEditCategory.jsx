import { useEffect, useState } from 'react'
import CustomButton from '../shared/CustomButton'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ListItemText, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { addCategory, updateCategory } from '../action/categoryAction';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import DropzoneImage from '../shared/DropzoneImage'

const AddEditCategory = ({ mode, id }) => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        name: "",
        image: "",
        parent_category: "",
        icon: "",
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [previewIcon, setPreviewIcon] = useState(null);
    const [error, setError] = useState ({});
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { category } = useSelector((state) => state.categoryState);

    useEffect(() => {
        if (mode === 'edit' && id && category?.category) {
            const categoryToEdit = category.category.find(cat => cat._id === id);
            if (categoryToEdit) {
                setData({
                    _id: categoryToEdit._id,
                    name: categoryToEdit.name,
                    image: categoryToEdit.image,
                    parent_category: categoryToEdit.parent_category,
                    icon: categoryToEdit.icon,

                });
                setPreviewImage(categoryToEdit.image);
                setPreviewIcon(categoryToEdit.icon);
            }
        }
    }, [mode, id, category?.category]);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setData({ name: "", image: "", parent_category: "", icon: "" });
        setPreviewImage(null);
        setPreviewIcon(null);
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


    const handleFileInputChange1 = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewIcon(reader.result);
        };
        reader.readAsDataURL(file);
        setData({ ...data, icon: file });
    };


    const validateInput = () => {
        let validationErrors = {
            name: data.name ? "" : " name is required",
            image: data.image ? "" : " image is required",
            parent_category: data.parent_category ? "" : "parent category is required",
            icon: data.icon ? "" : "icon is required"
        };

        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };

    const handleFormSubmit = async () => {
        if (validateInput()) {
            try {
                const formData = new FormData();
                formData.append("parent_category", data.parent_category);
                formData.append("name", data.name);

                if (data.image instanceof File) {
                    formData.append("image", data.image);
                }

                if (data.icon instanceof File) {
                    formData.append("icon", data.icon);
                }

                if (mode === 'add') {
                    await dispatch(addCategory(formData));
                    enqueueSnackbar("Category added successfully!", { variant: "success" });
                } else if (mode === 'edit') {
                    if (data._id) {
                        try {
                            await dispatch(updateCategory(data._id, formData));
                            enqueueSnackbar("Category updated successfully!", { variant: "success" });
                            handleClose();
                        } catch (error) {
                            enqueueSnackbar(error.message || "Failed to update category.", { variant: "error" });
                        }
                    } else {
                        enqueueSnackbar("Category ID is missing for edit operation", { variant: "error" });
                    }
                }
                handleClose();
            } catch (error) {
                enqueueSnackbar("Failed to process category.", { variant: "error" });
            }
        }
    };

    const onFieldChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
        setError((prevError) => ({ ...prevError, [key]: "" }));
    };



    return (
        <div>
            {mode === "add" ?
                <CustomButton onClick={handleOpen} mode={mode} />
                :
                <span onClick={handleOpen} className='flex cursor-pointer' >
                    <EditIcon className="mr-2" />
                    <ListItemText primary="Edit" />
                </span>
            }

            <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                    {mode === 'add' ? 'Add Category' : 'Edit Category'}
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

                        <h3 className='text-[15px]'>Parent Category</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="parent_category"
                            type="text"
                            fullWidth
                            value={data.parent_category}
                            onChange={(e) => onFieldChange("parent_category", e.target.value)}
                            error={!!error.parent_category}
                            helperText={error.parent_category}
                        />

                        <h3 className='text-[15px]'>Name</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            value={data.name}
                            onChange={(e) => onFieldChange("name", e.target.value)}
                            error={!!error.name}
                            helperText={error.name}
                        />

                        <div className='flex gap-4 mt-4'>
                            <div className='block w-full'>
                                <DropzoneImage
                                    onChange={handleFileInputChange}
                                    image={previewImage}
                                    id={data?._di}
                                />
                                {error.image && <Typography color="error">{error.image}</Typography>}
                            </div>

                            <div className='block w-full'>
                                <DropzoneImage
                                    onChange={handleFileInputChange1}
                                    image={previewIcon}
                                    id={data?._di}
                                />
                                {error.icon && <Typography color="error">{error.icon}</Typography>}
                            </div>
                        </div>


                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", paddingBottom: "20px" }}>
                    <Button
                        sx={{ backgroundColor: '#525b39', '&:hover': { backgroundColor: '#525b39' }, borderRadius: '10px' }}
                        variant="contained"
                        onClick={handleFormSubmit}
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

export default AddEditCategory
