import { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Button, TextField, Grid, Card, Typography, FormControl,
    InputLabel, Select, MenuItem, Box, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Switch, IconButton, Tooltip
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DropzoneImage from '../../shared/DropzoneImage';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {
    addProducts, fetchAllColors, GetAttributeName,
    GetAttributeValues, GetParentCat, getSub
} from '../../action/productAction';
import { fetchAllBrand } from '../../action/brandAction';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const AddProduct = () => {
    const [description, setDescription] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        brand: '',
        meta_title: '',
        meta_desc: '',
        parent_category: '',
        sub_category: '',
        image: '',
        gallery1: '',
        gallery2: '',
        gallery3: '',
        gallery4: '',
        gallery5: '',
    });

    // State for attributes and variants
    const [attributes, setAttributes] = useState([]);
    const [variants, setVariants] = useState([]);
    const [isAttributeEnabled, setIsAttributeEnabled] = useState(false);
    const [isColorEnabled, setIsColorEnabled] = useState(false);
    const [attributeOptions, setAttributeOptions] = useState({});

    // Image previews
    const [previewImage, setPreviewImage] = useState(null);
    const [previewImageOne, setPreviewImageOne] = useState(null);
    const [previewImageTwo, setPreviewImageTwo] = useState(null);
    const [previewImageThree, setPreviewImageThree] = useState(null);
    const [previewImageFour, setPreviewImageFour] = useState(null);
    const [previewImageFive, setPreviewImageFive] = useState(null);

    const [error, setError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    // Get data from Redux store
    const { distinctParent, catnames = [], color = [], distinctAttributeNames, AttributeValues = [] } =
        useSelector((state) => state.productState);
    const { brand = [] } = useSelector((state) => state.brandState);

    const parentCat = distinctParent?.distinctParent;
    const AllBrands = brand?.brand;
    const AllAttributes = distinctAttributeNames?.distinctAttributeNames || [];

    const AllCategoryNames = useMemo(() => {
        return (catnames?.catnames?._id === productData.parent_category)
            ? catnames.catnames.name || []
            : [];
    }, [catnames, productData.parent_category]);

    // Rich text editor options
    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];

    // Initialize data
    useEffect(() => {
        dispatch(GetParentCat());
        dispatch(fetchAllBrand());
        dispatch(fetchAllColors());
        dispatch(GetAttributeName());
    }, [dispatch]);

    // Update attribute values when attribute changes
    useEffect(() => {
        attributes.forEach(attr => {
            if (attr.id && !attributeOptions[attr.id]) {
                dispatch(GetAttributeValues(attr.id));
            }
        });
    }, [dispatch, attributes, attributeOptions]);

    // Update attribute options when new values are fetched
    useEffect(() => {
        if (AttributeValues?.AttributeValues) {
            const { _id, value } = AttributeValues.AttributeValues;
            if (_id && value) {
                setAttributeOptions(prev => ({
                    ...prev,
                    [_id]: value
                }));
            }
        }
    }, [AttributeValues]);

    // Memoized generate variants function
    const generateVariants = useCallback(() => {
        // Start with first attribute's values
        if (attributes.length === 0 || attributes.some(attr => attr.values.length === 0)) {
            setVariants([]);
            return;
        }

        // Start with the first attribute's values
        let combinations = attributes[0].values.map(value => ({
            combination: value,
            price: parseFloat(productData.price) || 0,
            stock: 0,
            sku: `${productData.name?.substring(0, 3).toUpperCase() || 'PRD'}-${value}`.replace(/\s+/g, '-')
        }));

        // For each subsequent attribute
        for (let i = 1; i < attributes.length; i++) {
            const newCombinations = [];

            for (const existing of combinations) {
                for (const value of attributes[i].values) {
                    newCombinations.push({
                        combination: `${existing.combination}-${value}`,
                        price: existing.price,
                        stock: existing.stock,
                        sku: `${existing.sku}-${value}`.replace(/\s+/g, '-')
                    });
                }
            }

            combinations = newCombinations;
        }

        setVariants(combinations);
    }, [attributes, productData.price, productData.name]);

    // Generate variants when attributes change
    useEffect(() => {
        if (isAttributeEnabled && attributes.length > 0 && attributes.every(attr => attr.values.length > 0)) {
            generateVariants();
        } else if (!isAttributeEnabled) {
            setVariants([]);
        }
    }, [attributes, isAttributeEnabled, generateVariants]);

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'parent_category') {
            setProductData(prev => ({
                ...prev,
                [name]: value,
                sub_category: '',
            }));
            dispatch(getSub(value.trim()));
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle attribute changes
    const handleAttributeAdd = () => {
        setAttributes([...attributes, { id: '', values: [] }]);
    };

    const handleAttributeRemove = (index) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];

        if (field === 'id') {
            newAttributes[index] = { id: value, values: [] };
            dispatch(GetAttributeValues(value));
        } else if (field === 'values') {
            newAttributes[index].values = value;
        }

        setAttributes(newAttributes);
    };

    // Handle variant changes
    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index] = {
            ...newVariants[index],
            [field]: field === 'price' || field === 'stock' ? parseFloat(value) : value
        };
        setVariants(newVariants);
    };

    // Handle image uploads
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

    // Form validation
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

    // Reset form
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
            gallery2: "",
            gallery3: "",
            gallery4: "",
            meta_title: "",
            meta_desc: "",
        });
        setAttributes([]);
        setVariants([]);
        setDescription(null);
        setIsAttributeEnabled(false);
        setIsColorEnabled(false);
        setPreviewImage(null);
        setPreviewImageFive(null);
        setPreviewImageFour(null);
        setPreviewImageThree(null);
        setPreviewImageTwo(null);
        setPreviewImageOne(null);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                const formData = new FormData();

                // Basic product data
                formData.append('name', productData.name);
                formData.append('price', productData.price);
                formData.append('brand', productData.brand);
                formData.append('meta_title', productData.meta_title || '');
                formData.append('meta_desc', productData.meta_desc || '');
                formData.append('parent_category', productData.parent_category);
                formData.append('sub_category', productData.sub_category);
                formData.append('description', description);

                // Images
                formData.append('image', productData.image);
                if (productData.gallery1) formData.append('gallery1', productData.gallery1);
                if (productData.gallery2) formData.append('gallery2', productData.gallery2);
                if (productData.gallery3) formData.append('gallery3', productData.gallery3);
                if (productData.gallery4) formData.append('gallery4', productData.gallery4);
                if (productData.gallery5) formData.append('gallery5', productData.gallery5);

                // Attributes
                if (isAttributeEnabled && attributes.length > 0) {
                    const attributesData = attributes.map(attr => ({
                        attribute: attr.id,
                        attribute_value: attr.values.map(v => ({ value: v }))
                    }));
                    formData.append('attributes', JSON.stringify(attributesData));
                }

                // Variants
                if (isAttributeEnabled && variants.length > 0) {
                    formData.append('variants', JSON.stringify(variants));
                }

                // Colors
                if (isColorEnabled && productData.color && productData.color.length > 0) {
                    productData.color.forEach(color => {
                        formData.append('color', color);
                    });
                }

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
                            <Grid item xs={12} md={productData.parent_category ? 6 : 12}>
                                <FormControl fullWidth>
                                    <InputLabel>Parent Category</InputLabel>
                                    <Select
                                        name="parent_category"
                                        value={productData.parent_category}
                                        onChange={handleChange}
                                        label="Parent Category"
                                        error={!!error.parent_category}
                                        required
                                    >
                                        <MenuItem value="" disabled>Select Parent Category</MenuItem>
                                        {parentCat && parentCat.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>{category.parent_category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {productData.parent_category && (
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Sub Category</InputLabel>
                                        <Select
                                            name="sub_category"
                                            value={productData.sub_category || []}
                                            onChange={handleChange}
                                            label="Sub Category"
                                            error={!!error.sub_category}
                                            required

                                        >
                                            <MenuItem value="" disabled>Select Sub Category</MenuItem>
                                            {AllCategoryNames && AllCategoryNames?.map((val) => (
                                                <MenuItem key={val} value={val}>{val}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                        </Box>
                    </Grid>


                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" gap="12px" sx={{
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <TextField
                                fullWidth
                                label="Unit Price"
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

                    {/* Attributes Section */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="subtitle1">Enable Attributes & Variants</Typography>
                            <Switch
                                checked={isAttributeEnabled}
                                onChange={() => setIsAttributeEnabled(prev => !prev)}
                                color="primary"
                            />
                            <Tooltip title="Attributes like Size, Weight, etc. will generate variants with different prices and stock">
                                <IconButton size="small">
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {isAttributeEnabled && (
                            <Box sx={{ mb: 4 }}>
                                {/* Attributes */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>Attributes</Typography>

                                    {attributes.map((attribute, index) => (
                                        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} sm={5}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>Attribute</InputLabel>
                                                        <Select
                                                            value={attribute.id}
                                                            onChange={(e) => handleAttributeChange(index, 'id', e.target.value)}
                                                            label="Attribute"
                                                        >
                                                            <MenuItem value="" disabled>Select Attribute</MenuItem>
                                                            {AllAttributes.map((attr) => (
                                                                <MenuItem key={attr._id} value={attr._id}>{attr.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>Values</InputLabel>
                                                        <Select
                                                            multiple
                                                            value={attribute.values}
                                                            onChange={(e) => handleAttributeChange(index, 'values', e.target.value)}
                                                            label="Values"
                                                            renderValue={(selected) => selected.join(', ')}
                                                            disabled={!attribute.id}
                                                        >
                                                            {attributeOptions[attribute.id]?.map((value) => (
                                                                <MenuItem key={value} value={value}>{value}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={1}>
                                                    <IconButton onClick={() => handleAttributeRemove(index)} color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}

                                    <Button
                                        variant="outlined"
                                        onClick={handleAttributeAdd}
                                        startIcon={<span>+</span>}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    >
                                        Add Attribute
                                    </Button>
                                </Box>

                                {/* Variants Table */}
                                {variants.length > 0 && (
                                    <Box sx={{ mt: 4 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Variants ({variants.length})
                                        </Typography>
                                        <TableContainer component={Paper}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Combination</TableCell>
                                                        <TableCell align="right">Price</TableCell>
                                                        <TableCell align="right">Stock</TableCell>
                                                        <TableCell align="right">SKU</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {variants.map((variant, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{variant.combination}</TableCell>
                                                            <TableCell align="right">
                                                                <TextField
                                                                    type="number"
                                                                    size="small"
                                                                    value={variant.price}
                                                                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                                                    InputProps={{ inputProps: { min: 0, step: '0.01' } }}
                                                                    sx={{ width: '100px' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <TextField
                                                                    type="number"
                                                                    size="small"
                                                                    value={variant.stock}
                                                                    onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                                                    InputProps={{ inputProps: { min: 0 } }}
                                                                    sx={{ width: '80px' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <TextField
                                                                    size="small"
                                                                    value={variant.sku}
                                                                    onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                                                    sx={{ width: '150px' }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Grid>

                    {/* Colors Section */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="subtitle1">Enable Colors</Typography>
                            <Switch
                                checked={isColorEnabled}
                                onChange={() => setIsColorEnabled(prev => !prev)}
                                color="primary"
                            />
                        </Box>

                        {isColorEnabled && (
                            <FormControl fullWidth>
                                <InputLabel>Colors</InputLabel>
                                <Select
                                    label="Colors"
                                    name="color"
                                    value={productData.color || []}
                                    onChange={handleChange}
                                    multiple
                                    renderValue={(selected) => selected.map(id => {
                                        const selectedColor = color.color && color.color.find(co => co._id === id);
                                        return selectedColor ? selectedColor.name : '';
                                    }).join(', ')}
                                >
                                    {color && color.color && color.color.map((co) => (
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
                        )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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