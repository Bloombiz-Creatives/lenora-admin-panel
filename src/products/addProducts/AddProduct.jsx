import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Card, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Switch } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DropzoneImage from '../../shared/DropzoneImage';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, fetchColors, GetAttributeName, GetAttributeValues, GetParentCat, getSub } from '../../action/productAction';
import { fetchBrand } from '../../action/brandAction';

const AddProduct = () => {

    const [description, setDescription] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        brand: '',
        meta_title: '',
        meta_desc: '',
        attribute: '',
        // attribute_value: '',
        // color: '',
        attribute_value: [],
        color: [],
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

    const [isColorEnabled, setIsColorEnabled] = useState(false);
    const [isAttributeEnabled, setIsAttributeEnabled] = useState(false);


    const [previewImage, setPreviewImage] = useState();
    const [error, setError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        if (productData.attribute) {
            dispatch(GetAttributeValues(productData.attribute));
        }
    }, [productData.attribute, dispatch]);


    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];



    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // setProductData({
        //     ...productData,
        //     [e.target.name]: e.target.value,
        // });

        setProductData({
            ...productData,
            [name]: Array.isArray(value) ? value : value,
        });

        if (name === 'parent_category') {
            const trimmedValue = value.trim();
            dispatch(getSub(trimmedValue));
        }

        if (name === 'attribute') {
            setProductData(prevData => ({
                ...prevData,
                [name]: value,
                attribute_value: []
            }));
            dispatch(GetAttributeValues(value))
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
        dispatch(fetchBrand())
        dispatch(fetchColors())
        dispatch(GetAttributeName())
    }, [dispatch])

    const { distinctParentCategories, categories = [], color = [], distinctAttributeNames, AttributeValues = [] } = useSelector((state) => state.productState);
    const parentCat = distinctParentCategories?.distinctParentCategories;

    const { brand = [] } = useSelector((state) => state.brandState);
    const AllBrands = brand?.brand;
    const AllAttributes = distinctAttributeNames?.distinctAttributeNames;
    const AllAttributesValues = AttributeValues?.AttributeValues;



    const validateInput = () => {
        let validationErrors = {
            name: productData.name ? "" : "Name is required",
            image: productData.image ? "" : "Image is required",
            parent_category: productData.parent_category ? "" : "Parent category is required",
            description: description ? "" : "Description is required",
            price: productData.price ? "" : "Price is required",
            sub_category: productData.sub_category ? "" : "Sub-category is required",
            brand: productData.brand ? "" : "Brand is required",
            gallery1: productData.gallery1 ? "" : "At least one gallery image is required",
        };

        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };

    const handleClose = () => {
        setProductData({
            name: "",
            image: "",
            parent_category: "",
            description: "",
            price: "",
            sub_category: "",
            brand: "",
            gallery1: "",
            gallery5: "",
            gallery2: " ",
            gallery3: "",
            gallery4: "",
            meta_title: "",
            meta_desc: "",
            attribute: "",
            attribute_value: "",
            color: "",
        })
        setDescription(null);
        setIsAttributeEnabled(false);
        setIsColorEnabled(false);
        setPreviewImage(null);
        setPreviewImageFive(null);
        setPreviewImageFour(null);
        setPreviewImageThree(null);
        setPreviewImageTwo(null);
        setPreviewImageOne(null);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                const formData = new FormData();
                formData.append('name', productData.name);
                formData.append('price', productData.price);
                formData.append('brand', productData.brand);
                formData.append('meta_title', productData.meta_title);
                formData.append('meta_desc', productData.meta_desc);
                formData.append('parent_category', productData.parent_category);
                formData.append('sub_category', productData.sub_category);
                formData.append('description', description);
                formData.append('image', productData.image);
                formData.append('gallery1', productData.gallery1);
                formData.append('gallery2', productData.gallery2);
                formData.append('gallery3', productData.gallery3);
                formData.append('gallery4', productData.gallery4);
                formData.append('gallery5', productData.gallery5);


                if (productData.attribute) {
                    formData.append('attribute', productData.attribute);
                }

                // if (productData.attribute_value) {
                //     formData.append('attribute_value', productData.attribute_value);
                // }

                // if (productData.color) {
                //     formData.append('color', productData.color);
                // }

                productData.attribute_value.forEach((value) => {
                    formData.append('attribute_value', value);
                });
                
                productData.color.forEach((color) => {
                    formData.append('color', color);
                });

                dispatch(addProducts(formData));
                enqueueSnackbar("Product added successfully", { variant: "success" });
                handleClose();
            } catch (error) {
                console.error('Error adding product:', error);
                enqueueSnackbar("Cannot add product", { variant: "error" });
            }
        }
    };



    return (
        <div>
            <Card sx={{ my: 5, px: 5, py: 4, mx: 5 }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Add Product
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            error={!!error.name}
                            helperText={error.name}
                            required

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" gap="12px" sx={{
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <Grid item xs={12} md={6}  >
                                <FormControl fullWidth>
                                    <InputLabel>Parent Category</InputLabel>
                                    <Select
                                        name="parent_category"
                                        value={productData.parent_category}
                                        onChange={handleChange}
                                        label="parent_category"
                                        error={!!error.parent_category}
                                        helperText={error.parent_category}
                                        required

                                    >
                                        <MenuItem value="" disabled>Select Parent Category</MenuItem>
                                        {parentCat && parentCat.map((category) => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}  >
                                <FormControl fullWidth>
                                    <InputLabel>Sub Category</InputLabel>
                                    <Select
                                        name="sub_category"
                                        value={productData.sub_category}
                                        onChange={handleChange}
                                        label="sub_category"
                                        error={!!error.sub_category}
                                        helperText={error.sub_category}
                                        required

                                    >
                                        <MenuItem value="" disabled>Select Sub Category</MenuItem>
                                        {categories && categories.map((cat) => (
                                            <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" gap="12px" sx={{
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                type="number"
                                error={!!error.price}
                                helperText={error.price}
                                required

                            />

                            <FormControl fullWidth >
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    name="brand"
                                    value={productData.brand}
                                    onChange={handleChange}
                                    label="Brand"
                                    error={!!error.brand}

                                >
                                    {AllBrands && AllBrands.map((bb) => (
                                        <MenuItem key={bb._id} value={bb._id}>{bb.name}</MenuItem>
                                    ))}
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
                            error={!!error.description}
                            helperText={error.description}

                        />
                    </Grid>

                    <div className='block w-full ml-4 xl:mt-14 lg:mt-24 md:mt-28 mt-56'>
                        <p>Thumbnail</p>
                        <DropzoneImage onChange={handleFileImageChange} image={previewImage} id={productData._id} />
                        {error.image && <Typography color="error">{error.image}</Typography>}
                    </div>

                    <div className='block mt-10 ml-4 w-full'>
                        <p>Gallary Images</p>
                        <div className='flex xl:flex-nowrap flex-wrap gap-2 justify-center items-center w-[100%] '>
                            <div className='xl:w-[20%] w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery1Change}
                                    image={previewImageOne}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='xl:w-[20%] w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery2Change}
                                    image={previewImageTwo}
                                    id={productData?._id}
                                />
                                {error.gallery1 && <Typography color="error">{error.gallery1}</Typography>}
                            </div>

                            <div className='xl:w-[20%] w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery3Change}
                                    image={previewImageThree}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='xl:w-[20%] w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery4Change}
                                    image={previewImageFour}
                                    id={productData?._id}
                                />
                            </div>

                            <div className='xl:w-[20%] w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery5Change}
                                    image={previewImageFive}
                                    id={productData?._id}
                                />
                            </div>
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
                        <FormControl component="fieldset">
                            <Typography component="legend">Enable Attribute</Typography>
                            <Switch
                                checked={isAttributeEnabled}
                                onChange={() => setIsAttributeEnabled(prev => !prev)}
                                color="success"
                            />
                        </FormControl>
                    </Grid>
                    {isAttributeEnabled && (

                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" gap="12px" sx={{
                                flexDirection: { xs: 'column', md: 'row' },
                            }}>
                                <FormControl fullWidth >
                                    <InputLabel>Attribute</InputLabel>
                                    <Select
                                        name="attribute"
                                        value={productData.attribute}
                                        onChange={handleChange}
                                        label="Attribute"
                                        error={!!error.attribute}
                                        helperText={error.attribute}
                                        required

                                    >
                                        <MenuItem value="" disabled>Select Attribute</MenuItem>
                                        {AllAttributes && AllAttributes.map((att) => (
                                            <MenuItem key={att._id} value={att._id}>{att.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Attribute Value</InputLabel>
                                    <Select
                                        // name="attribute_value"
                                        // value={productData.attribute_value}
                                        // onChange={handleChange}
                                        // label="attribute_value"
                                        // error={!!error.attribute_value}
                                        // helperText={error.attribute_value}
                                        // required

                                        name="attribute_value"
                                        // value={productData.attribute_value}
                                        value={productData.attribute_value || []}
                                        onChange={handleChange}
                                        label="Attribute Value"
                                        multiple
                                        renderValue={(selected) => selected.join(', ')}

                                    >
                                        <MenuItem value="" disabled>Select Sub Category</MenuItem>
                                        {AllAttributesValues && AllAttributesValues.map((val) => (
                                            <MenuItem key={val} value={val}>{val}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>

                    )}

                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <Typography component="legend">Enable Color</Typography>
                            <Switch
                                checked={isColorEnabled}
                                onChange={() => setIsColorEnabled(prev => !prev)}
                                color="success"
                            />
                        </FormControl>
                    </Grid>

                    {isColorEnabled && (
                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <InputLabel>Color</InputLabel>
                                <Select
                                    // label="Color"
                                    // name="color"
                                    // value={productData.color}
                                    // onChange={handleChange}
                                    // error={!!error.color}
                                    // helperText={error.color}

                                    label="Color"
                                    name="color"
                                    value={productData.color}
                                    onChange={handleChange}
                                    multiple
                                    renderValue={(selected) => selected.map(id => {
                                        const selectedColor = color.color.find(co => co._id === id);
                                        return selectedColor ? selectedColor.name : '';
                                    }).join(', ')}
                                >
                                    {color && color?.color?.map((co) => (
                                        <MenuItem key={co._id} value={co._id}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: co.color_code,
                                                        marginRight: 1,
                                                    }}
                                                />
                                                {co.name}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ px: 8, py: 2 }}
                        >
                            Add Product
                        </Button>
                    </Grid>

                </Grid>
            </Card>
        </div>
    );
};

export default AddProduct;

