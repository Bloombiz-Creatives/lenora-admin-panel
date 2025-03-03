import { useSnackbar } from 'notistack';
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../shared/CustomButton';
import { editPromo } from '../../../action/websiteAction';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton } from '@mui/material';
import DropzoneImage from '../../../shared/DropzoneImage';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


const EditPromo = ({mode, id}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const [previewImage1, setPreviewImage1] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        image1: "",
        image2: "",
    })

    const { promo } = useSelector((state) => state.websiteState);
    const promoData = promo?.promo ?? [];

    useEffect(() => {
        if (promoData){
            setPreviewImage1(promoData?.image1);
            setPreviewImage2(promoData?.image2);
        }
    },[promoData])

    const handleFileInputChange1 = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage1(reader.result);
        };
        reader.readAsDataURL(file);
        setData({ ...data, image1: file });
    };

    const handleFileInputChange2 = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage2(reader.result);
        };
        reader.readAsDataURL(file);
        setData({ ...data, image2: file });
    };


    const handleSave = () => {
        const formData = new FormData();

        if (data.image1 instanceof File) {
            formData.append("image1", data.image1);
        }

        if (data.image2 instanceof File) {
            formData.append("image2", data.image2);
        }

        dispatch(editPromo(id, formData)).then(()=>{
            enqueueSnackbar("Hero updated successfully!", { variant: "success" })
        })
        handleClose();
    }


    return (
        <div>
            <CustomButton onClick={handleOpen} mode={mode} />

            <Dialog open={open} maxWidth="md" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                     Edit Sub Hero
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
                        <div className='flex gap-4 mt-4'>
                            <div className='block w-full'>
                            <p>(628 × 319 px)</p>
                                <DropzoneImage
                                    onChange={handleFileInputChange1}
                                    image={previewImage1}
                                    id={data?._id}
                                />
                            </div>

                            <div className='block w-full'>
                            <p>(628 × 319 px)</p>
                                <DropzoneImage
                                    onChange={handleFileInputChange2}
                                    image={previewImage2}
                                    id={data?._id}
                                />
                            </div>

                        </div>


                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", paddingBottom: "20px" }}>
                    <Button
                        sx={{ backgroundColor: '#525b39', '&:hover': { backgroundColor: '#525b39' }, borderRadius: '10px' }}
                        variant="contained"
                        onClick={handleSave}
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

EditPromo.propTypes = {
    id: PropTypes.string,
    mode: PropTypes.string.isRequired,
};

export default EditPromo
