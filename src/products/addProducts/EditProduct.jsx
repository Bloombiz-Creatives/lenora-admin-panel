
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Tooltip,
    Grid,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import DropzoneImage from "../../shared/DropzoneImage";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
    fetchAllColors,
    GetAttributeName,
    GetAttributeValues,
    GetParentCat,
    getSub,
    updateProducts,
} from "../../action/productAction";
import { fetchAllBrand } from "../../action/brandAction";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const EditProduct = ({ id, open, handleClose }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // Basic product data state
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        brand: "",
        meta_title: "",
        meta_desc: "",
        parent_category: "",
        sub_category: "",
        color: [],
    });

    // Rich text editor state
    const [description, setDescription] = useState('');

    // State for attributes and variants
    const [attributes, setAttributes] = useState([]);
    const [variants, setVariants] = useState([]);
    const [isAttributeEnabled, setIsAttributeEnabled] = useState(false);
    const [isColorEnabled, setIsColorEnabled] = useState(false);
    const [attributeOptions, setAttributeOptions] = useState({});

    // Image states
    const [previewImage, setPreviewImage] = useState(null);
    const [previewImageOne, setPreviewImageOne] = useState(null);
    const [previewImageTwo, setPreviewImageTwo] = useState(null);
    const [previewImageThree, setPreviewImageThree] = useState(null);
    const [previewImageFour, setPreviewImageFour] = useState(null);
    const [previewImageFive, setPreviewImageFive] = useState(null);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    
    // File states
    const [mainImageFile, setMainImageFile] = useState(null);
    const [galleryImageFiles, setGalleryImageFiles] = useState({
        gallery1: null,
        gallery2: null,
        gallery3: null,
        gallery4: null,
        gallery5: null
    });

    // Get data from Redux store
    const {
        distinctParent,
        catnames = [],
        color = [],
        distinctAttributeNames,
        AttributeValues = [],
        products,
    } = useSelector((state) => state.productState);
    const { brand = [] } = useSelector((state) => state.brandState);

    const parentCat = distinctParent?.distinctParent;
    const AllBrands = brand?.brand;
    const AllAttributes = distinctAttributeNames?.distinctAttributeNames || [];

    const AllCategoryNames = (catnames?.catnames?._id === productData.parent_category)
        ? catnames.catnames.name || []
        : [];

    // Initial data fetching
    useEffect(() => {
        dispatch(GetParentCat());
        dispatch(fetchAllBrand());
        dispatch(fetchAllColors());
        dispatch(GetAttributeName());
    }, [dispatch]);


    const generateVariants = useCallback(() => {
        if (!isAttributeEnabled || attributes.length === 0) {
            return;
        }
    
        // Helper function to generate all possible combinations
        const generateCombinations = (arrays) => {
            if (arrays.length === 0) return [[]];
            const [first, ...rest] = arrays;
            const combinations = generateCombinations(rest);
            return first.flatMap(item => combinations.map(combo => [item, ...combo]));
        };
    
        // Get all attribute values arrays
        const attributeValues = attributes
            .filter(attr => attr.id && attr.values && attr.values.length > 0)
            .map(attr => attr.values);
    
        if (attributeValues.length === 0) return;
    
        // Generate all possible combinations
        const combinations = generateCombinations(attributeValues);
    
        // Create a map of existing variants for quick lookup
        const existingVariantsMap = {};
        variants.forEach(variant => {
            existingVariantsMap[variant.combination] = variant;
        });
    
        // Generate new variants while preserving existing ones
        const newVariants = combinations.map(combination => {
            const combinationString = combination.join('-');
            const existing = existingVariantsMap[combinationString];
    
            if (existing) {
                return existing;
            }
    
            // Generate SKU based on product name and combination
            const baseSkuPart = productData.name?.substring(0, 3).toUpperCase() || 'PRD';
            const sku = `${baseSkuPart}-${combinationString}`.replace(/\s+/g, '-');
    
            return {
                combination: combinationString,
                price: parseFloat(productData.price) || 0,
                stock: 0,
                sku: sku
            };
        });
    
        setVariants(newVariants);
    }, [attributes, isAttributeEnabled, productData.price, productData.name, variants]);


    // Initialize product data when ID is provided
    useEffect(() => {
        if (products?.products && id) {
            const proToEdit = products?.products?.find((prod) => prod._id === id);

            if (proToEdit) {
                setDescription(proToEdit.description || '');
                setProductData({
                    name: proToEdit.name || "",
                    price: proToEdit.price || "",
                    brand: proToEdit.brand?._id || "",
                    meta_title: proToEdit.meta_title || "",
                    meta_desc: proToEdit.meta_desc || "",
                    parent_category: proToEdit.parent_category || "",
                    sub_category: Array.isArray(proToEdit.sub_category) ? proToEdit.sub_category : [],
                    color: proToEdit.color || [],
                });

                // Handle attributes
                if (proToEdit.attributes && proToEdit.attributes.length > 0) {
                    setIsAttributeEnabled(true);
                    const processedAttributes = proToEdit.attributes.map(attr => ({
                        id: attr.attribute,
                        values: attr.attribute_value.map(av => av.value || av)
                    }));
                    setAttributes(processedAttributes);

                    // Fetch values for each attribute
                    processedAttributes.forEach(attr => {
                        if (attr.id) {
                            dispatch(GetAttributeValues(attr.id));
                        }
                    });
                }

                if (proToEdit.attributes && proToEdit.attributes.length > 0) {
                setIsAttributeEnabled(true);
                const processedAttributes = proToEdit.attributes.map(attr => ({
                    id: attr.attribute,
                    values: attr.attribute_value.map(av => av.value || av)
                }));
                setAttributes(processedAttributes);
            }


            if (proToEdit.variants && proToEdit.variants.length > 0) {
                const processedVariants = proToEdit.variants.map(variant => ({
                    combination: variant.combination,
                    price: Number(variant.price), 
                    stock: Number(variant.stock), 
                    sku: variant.sku
                }));
                setVariants(processedVariants);
                setInitialDataLoaded(true); 
            }

                // Handle colors
                if (proToEdit.color && proToEdit.color.length > 0) {
                    setIsColorEnabled(true);
                }

                // Handle images
                setPreviewImage(proToEdit.image || null);
                setPreviewImageOne(proToEdit.gallery1 || null);
                setPreviewImageTwo(proToEdit.gallery2 || null);
                setPreviewImageThree(proToEdit.gallery3 || null);
                setPreviewImageFour(proToEdit.gallery4 || null);
                setPreviewImageFive(proToEdit.gallery5 || null);

                if (proToEdit.parent_category) {
                    dispatch(getSub(proToEdit.parent_category));
                }
            }
        }
    }, [products?.products, id, dispatch, initialDataLoaded]);

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


    useEffect(() => {
        if (isAttributeEnabled && attributes.length > 0 && !initialDataLoaded) {
            generateVariants();
        }
    }, [attributes, isAttributeEnabled, generateVariants, initialDataLoaded]);

    // Rich text editor options
    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];

    // Handlers for changes
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

    const handleDescriptionChange = (value) => {
        setDescription(value);
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

        setTimeout(() => generateVariants(), 0);

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
        setMainImageFile(file);
    };

    const handleFileGalleryChange = (event, index) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            switch (index) {
                case 1: setPreviewImageOne(reader.result); break;
                case 2: setPreviewImageTwo(reader.result); break;
                case 3: setPreviewImageThree(reader.result); break;
                case 4: setPreviewImageFour(reader.result); break;
                case 5: setPreviewImageFive(reader.result); break;
                default: break;
            }
        };
        reader.readAsDataURL(file);
        setGalleryImageFiles(prev => ({ ...prev, [`gallery${index}`]: file }));
    };

    // Submit form
    const handleSubmit = () => {
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
        if (mainImageFile) {
            formData.append('image', mainImageFile);
        }
        if (galleryImageFiles.gallery1) {
            formData.append('gallery1', galleryImageFiles.gallery1);
        }
        if (galleryImageFiles.gallery2) {
            formData.append('gallery2', galleryImageFiles.gallery2);
        }
        if (galleryImageFiles.gallery3) {
            formData.append('gallery3', galleryImageFiles.gallery3);
        }
        if (galleryImageFiles.gallery4) {
            formData.append('gallery4', galleryImageFiles.gallery4);
        }
        if (galleryImageFiles.gallery5) {
            formData.append('gallery5', galleryImageFiles.gallery5);
        }

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

        dispatch(updateProducts(id, formData))
            .then(() => {
                enqueueSnackbar("Product updated successfully", { variant: "success" });
                handleClose();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                enqueueSnackbar("Failed to update product", { variant: "error" });
            });
    };

    return (
        <Dialog open={open} maxWidth="lg" fullWidth sx={{ borderRadius: "15px" }}>
            <DialogTitle className="text-[24px] font-medium">
                Edit Product
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box component="form" autoComplete="off">
                    <TextField
                        fullWidth
                        label="Product Name"
                        name="name"
                        type="text"
                        value={productData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    
                    <Box display="flex" gap={2} mb={2} sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                        <FormControl fullWidth>
                            <InputLabel>Parent Category</InputLabel>
                            <Select
                                name="parent_category"
                                value={productData.parent_category}
                                onChange={handleChange}
                                label="Parent Category"
                            >
                                <MenuItem value="" disabled>
                                    Select Parent Category
                                </MenuItem>
                                {parentCat && parentCat.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.parent_category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Sub Category</InputLabel>
                            <Select
                                name="sub_category"
                                value={productData.sub_category}
                                onChange={handleChange}
                                label="Sub Category"
                                disabled={!productData.parent_category}
                            >
                                <MenuItem value="" disabled>Select Sub Category</MenuItem>
                                {AllCategoryNames && AllCategoryNames.map((val) => (
                                    <MenuItem key={val} value={val}>{val}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" gap={2} mb={2} sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            type="number"
                            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                                label="Brand"
                            >
                                <MenuItem value="" disabled>Select Brand</MenuItem>
                                {AllBrands && AllBrands.map((bb) => (
                                    <MenuItem key={bb._id} value={bb._id}>{bb.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mb={2} mt={4}>
                        <ReactQuill
                            theme='snow'
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Product Description"
                            modules={{ toolbar: toolbarOptions }}
                            style={{ height: '200px', marginBottom: '50px' }}
                        />
                    </Box>

                    <Box mb={2} mt={6}>
                        <Typography variant="subtitle1" gutterBottom>Thumbnail</Typography>
                        <DropzoneImage onChange={handleFileImageChange} image={previewImage} id="main-image" />
                    </Box>

                    <Box mb={2} mt={4}>
                        <Typography variant="subtitle1" gutterBottom>Gallery Images</Typography>
                        <Box display="flex" gap={2} sx={{
                            flexDirection: { xs: 'column', sm: 'row' },
                            flexWrap: { sm: 'wrap', md: 'nowrap' },
                        }}>
                            <Box flex={1}>
                                <DropzoneImage 
                                    onChange={(e) => handleFileGalleryChange(e, 1)} 
                                    image={previewImageOne} 
                                    id="gallery1" 
                                />
                            </Box>
                            <Box flex={1}>
                                <DropzoneImage 
                                    onChange={(e) => handleFileGalleryChange(e, 2)} 
                                    image={previewImageTwo} 
                                    id="gallery2" 
                                />
                            </Box>
                            <Box flex={1}>
                                <DropzoneImage 
                                    onChange={(e) => handleFileGalleryChange(e, 3)} 
                                    image={previewImageThree} 
                                    id="gallery3" 
                                />
                            </Box>
                            <Box flex={1}>
                                <DropzoneImage 
                                    onChange={(e) => handleFileGalleryChange(e, 4)} 
                                    image={previewImageFour} 
                                    id="gallery4" 
                                />
                            </Box>
                            <Box flex={1}>
                                <DropzoneImage 
                                    onChange={(e) => handleFileGalleryChange(e, 5)} 
                                    image={previewImageFive} 
                                    id="gallery5" 
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Meta data section */}
                    <Box mb={2} mt={4}>
                        <Typography variant="subtitle1" gutterBottom>SEO Information</Typography>
                        <TextField
                            fullWidth
                            label="Meta Title"
                            name="meta_title"
                            value={productData.meta_title || ''}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Meta Description"
                            name="meta_desc"
                            value={productData.meta_desc || ''}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </Box>

                    {/* Attributes Section */}
                    <Box mb={2} mt={4}>
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
                                                            {AllAttributes && AllAttributes.map((attr) => (
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
                                        {console.log("Rendering variants:", variants)}
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
                    </Box>

                    {/* Colors Section */}
                    <Box mb={2} mt={4}>
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
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                }}
            >
                <Button
                    sx={{
                        backgroundColor: "#525b39",
                        "&:hover": { backgroundColor: "#525b39" },
                        borderRadius: "10px",
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
                <Button
                    sx={{
                        color: "#525b39",
                        borderColor: "#525b39",
                        borderRadius: "10px",
                        "&:hover": { borderColor: "#525b39" },
                    }}
                    variant="outlined"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EditProduct.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default EditProduct;