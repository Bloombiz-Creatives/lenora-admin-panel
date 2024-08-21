import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Card, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DropzoneImage from '../../shared/DropzoneImage';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, GetParentCat, getSub } from '../../action/productAction';

const AddProduct = () => {

    const [description, setDescription] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        brand: '',
        meta_title: '',
        meta_desc: '',
        attribute: '',
        color: '',
        parent_category: '',
        sub_category: '',
        image: '',
        gallery1: '',
        gallery2: '',
        gallery3: '',
        gallery4: '',
        gallery5: '',
    });

    const [previewImageOne, setPreviewImageOne] = useState(null);
    const [previewImageTwo, setPreviewImageTwo] = useState(null);
    const [previewImageThree, setPreviewImageThree] = useState(null);
    const [previewImageFour, setPreviewImageFour] = useState(null);
    const [previewImageFive, setPreviewImageFive] = useState(null);

    const [previewImage, setPreviewImage] = useState();
    const [error, setError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();


    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });

        if (name === 'parent_category') {
            const trimmedValue = value.trim();
            dispatch(getSub(trimmedValue)); 
        }
    };


    const handleFileImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, image: file });
    };


    const handleFileGallery1Change = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageOne(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, gallery1: file });
    };


    const handleFileGallery2Change = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageTwo(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, gallery2: file });
    };


    const handleFileGallery3Change = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageThree(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, gallery3: file });
    };


    const handleFileGallery4Change = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageFour(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, gallery4: file });
    };


    const handleFileGallery5Change = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageFive(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({ ...productData, gallery5: file });
    };


    useEffect(() => {
        dispatch(GetParentCat())
    }, [dispatch])

    const { distinctParentCategories } = useSelector((state) => state.productState);
    const parentCat = distinctParentCategories?.distinctParentCategories;


    const validateInput = () => {
        let validationErrors = {
            name: productData.name ? "" : " name is required",
            image: productData.image ? "" : " image is required",
            parent_category: productData.parent_category ? "" : "parent category is required",
            description: productData.description ? "" : "description is required",
            price: productData.price ? "" : "price is required",
            sub_category: productData.sub_category ? "" : "sub_category is required",
            brand: description.brand ? "" : "brand  is required",
            gallery1: productData.gallery1.length > 0 ? "" : "at least one gallery image is required",
        };

        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };

    const handleSubmit = async () => {
        if (validateInput()) {
            try {

                const formData = new FormData();
                formData.append('name', productData.name);
                formData.append('price', productData.price);
                formData.append('brand', productData.brand);
                formData.append('meta_title', productData.meta_title);
                formData.append('meta_desc', productData.meta_desc);
                formData.append('attribute', productData.attribute);
                formData.append('color', productData.color);
                formData.append('parent_category', productData.parent_category);
                formData.append('sub_category', productData.sub_category);
                formData.append('description', description);
                formData.append('image', productData.image);
                formData.append('gallery1', productData.gallery1);
                formData.append('gallery2', productData.gallery2);
                formData.append('gallery3', productData.gallery3);
                formData.append('gallery4', productData.gallery4);
                formData.append('gallery5', productData.gallery5);

                dispatch(addProducts(formData));
                enqueueSnackbar("product added successfully", { variant: "success" });

            } catch (error) {
                console.error('Error adding product:', error);
                enqueueSnackbar("can not add product", { variant: "error" });
            }
        }
    };


    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }], 
        ['clean']
    ];


    
    return (
        <div>
            <Card sx={{ my: 5, px: 5, py: 4, mx: 5 }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Add Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <div className="mt-4 w-full justify-center items-center ml-4">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Parent Category</InputLabel>
                                        <Select
                                            name="parent_category"
                                            value={productData.parent_category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="" disabled>Select Parent Category</MenuItem>
                                            {parentCat && parentCat.map((category) => (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Sub Category</InputLabel>
                                        <Select
                                            name="sub_category"
                                            value={productData.sub_category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="" disabled>Select Sub Category</MenuItem>
                                            <MenuItem value="SubCategory 1">SubCategory 1</MenuItem>
                                            <MenuItem value="SubCategory 2">SubCategory 2</MenuItem>
                                            <MenuItem value="SubCategory 3">SubCategory 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" gap="12px">
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                />

                                <FormControl fullWidth required>
                                    <InputLabel>Brand</InputLabel>
                                    <Select
                                        name="brand"
                                        value={productData.brand}
                                        onChange={handleChange}
                                        label="Brand"
                                    >
                                        <MenuItem value="brand1">Brand 1</MenuItem>
                                        <MenuItem value="brand2">Brand 2</MenuItem>
                                        <MenuItem value="brand3">Brand 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>


                        <Grid item xs={12}>
                            <ReactQuill
                                theme='snow'
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Product Description"
                                modules={{ toolbar: toolbarOptions }}
                                style={{ height: '100px' }}
                            />
                        </Grid>

                        <div className='block w-full ml-4 mt-14'>
                            <p>Thumbnail</p>
                            <DropzoneImage onChange={handleFileImageChange} image={previewImage} id={productData._id} />
                            {error.image && <Typography color="error">{error.image}</Typography>}
                        </div>

                        <div className='flex w-full ml-4 mt-10 gap-2'>
                            <div className='w-[25%]'>
                                <DropzoneImage
                                    onChange={handleFileGallery1Change}
                                    image={previewImageOne}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='w-[25%]'>
                                <DropzoneImage
                                    onChange={handleFileGallery2Change}
                                    image={previewImageTwo}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='w-[25%]'>
                                <DropzoneImage
                                    onChange={handleFileGallery3Change}
                                    image={previewImageThree}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='w-[25%]'>
                                <DropzoneImage
                                    onChange={handleFileGallery4Change}
                                    image={previewImageFour}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='w-[25%]'>
                                <DropzoneImage
                                    onChange={handleFileGallery5Change}
                                    image={previewImageFive}
                                    id={productData?._id}
                                />
                            </div>
                        </div>



                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label="Meta Title"
                                name="meta_title"
                                value={productData.meta_title}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Meta Description"
                                name="meta_desc"
                                value={productData.meta_desc}
                                onChange={handleChange}
                                rows={4}
                                multiline

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Attribute"
                                name="attribute"
                                value={productData.attribute}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Color"
                                name="color"
                                value={productData.color}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    );
};

export default AddProduct;



