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
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import DropzoneImage from "../../shared/DropzoneImage";
import CloseIcon from "@mui/icons-material/Close";
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

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        brand: "",
        meta_title: "",
        meta_desc: "",
        attribute: "",
        attribute_value: [],
        color: [],
        parent_category: "",
        sub_category: "",
    });

    useEffect(() => {
        dispatch(GetParentCat());
        dispatch(fetchAllBrand());
        dispatch(fetchAllColors());
        dispatch(GetAttributeName());
    }, [dispatch]);


    const {
        distinctParent,
        catnames = [],
        color = [],
        distinctAttributeNames,
        AttributeValues = [],
        products,
    } = useSelector((state) => state.productState);


    const parentCat = distinctParent?.distinctParent;
    const { brand = [] } = useSelector((state) => state.brandState);
    const AllBrands = brand?.brand;
    const AllAttributes = distinctAttributeNames?.distinctAttributeNames;
    const AllAttributesValues = (AttributeValues?.AttributeValues?._id === productData.attribute)
        ? AttributeValues.AttributeValues.value || []
        : [];

    const AllCategoryNames = (catnames?.catnames?._id === productData.parent_category)
        ? catnames.catnames.name || []
        : [];



    const [previewImageOne, setPreviewImageOne] = useState(null);
    const [previewImageTwo, setPreviewImageTwo] = useState(null);
    const [previewImageThree, setPreviewImageThree] = useState(null);
    const [previewImageFour, setPreviewImageFour] = useState(null);
    const [previewImageFive, setPreviewImageFive] = useState(null);

    const [previewImage, setPreviewImage] = useState();

    const [mainImageFile, setMainImageFile] = useState(null);
    const [galleryImageFiles, setGalleryImageFiles] = useState({
        gallery1: null,
        gallery2: null,
        gallery3: null,
        gallery4: null,
        gallery5: null
    });

    const [description, setDescription] = useState('');
    const { enqueueSnackbar } = useSnackbar();


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
                    attribute: proToEdit.attribute || "",
                    attribute_value: Array.isArray(proToEdit.attribute_value) ? proToEdit.attribute_value : [],
                    color: proToEdit.color || "",
                    parent_category: proToEdit.parent_category || "",
                    // sub_category: proToEdit.sub_category || "",
                    sub_category: Array.isArray(proToEdit.sub_category) ? proToEdit.sub_category : [],


                });

                setPreviewImage(proToEdit.image || null);
                setPreviewImageOne(proToEdit.gallery1 || null);
                setPreviewImageTwo(proToEdit.gallery2 || null);
                setPreviewImageThree(proToEdit.gallery3 || null);
                setPreviewImageFour(proToEdit.gallery4 || null);
                setPreviewImageFive(proToEdit.gallery5 || null);

                // if (proToEdit.category) {
                //     dispatch(getSub(proToEdit.category));
                // }

                if (proToEdit.parent_category) {
                    dispatch(getSub(proToEdit.parent_category));
                }

            }
        }
    }, [products?.products, id, dispatch]);


    useEffect(() => {
        if (productData.attribute) {
            dispatch(GetAttributeValues(productData.attribute))
        }
    }, [productData.attribute, dispatch]);




 

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData({
            ...productData,
            [name]: Array.isArray(value) ? value : value,
        });


        if (name === 'parent_category') {
            setProductData(prevData => ({
                ...prevData,
                sub_category: '', 
            }));
            dispatch(getSub(value.trim()));
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
            }
        };
        reader.readAsDataURL(file);
        setGalleryImageFiles(prev => ({ ...prev, [`gallery${index}`]: file }));
    };


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


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('brand', productData.brand);
        formData.append('meta_title', productData.meta_title);
        formData.append('meta_desc', productData.meta_desc);
        formData.append('parent_category', productData.parent_category);
        formData.append('sub_category', productData.sub_category);
        formData.append('description', description);


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


        if (productData?.attribute) {
            formData.append('attribute', productData?.attribute);
        }


        productData?.attribute_value?.forEach((value) => {
            formData.append('attribute_value', value);
        });

        productData?.color.forEach((color) => {
            formData.append('color', color);
        });

        dispatch(updateProducts(id, formData)).then(() => {
            enqueueSnackbar("Product updated successfully!", { variant: "success" })
        })
        handleClose();
    }

    return (
        <div>
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
                        />
                        <div className="flex gap-4 mt-4">
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
                                    {/* {parentCat &&
                                        parentCat.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))} */}

                                    {parentCat && parentCat.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>{category.parent_category}</MenuItem>
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
                                >
                                    {/* {categories.map((cat) => (
                                        <MenuItem key={cat.name} value={cat.name}>
                                            {cat.name}
                                        </MenuItem>
                                    ))} */}

                                    {AllCategoryNames && AllCategoryNames?.map((val) => (
                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                type="number"
                            />

                            <FormControl fullWidth >
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    name="brand"
                                    value={productData.brand}
                                    onChange={handleChange}
                                    label="Brand"

                                >
                                    {AllBrands && AllBrands.map((bb) => (
                                        <MenuItem key={bb._id} value={bb._id}>{bb.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mt-6">
                            <ReactQuill
                                theme='snow'
                                value={description || productData.description}
                                onChange={handleDescriptionChange}
                                placeholder="Product Description"
                                modules={{ toolbar: toolbarOptions }}
                                style={{ height: '100px' }}
                            />
                        </div>

                        <div className='block w-full mt-16'>
                            <p>Thumbnail</p>
                            <DropzoneImage onChange={handleFileImageChange} image={previewImage} id="main-image" />
                        </div>

                        <div className="flex gap-4 mt-4 w-full justify-center items-center">
                            <div className=' w-full'>
                                <DropzoneImage onChange={(e) => handleFileGalleryChange(e, 1)} image={previewImageOne} id="gallery1" />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage onChange={(e) => handleFileGalleryChange(e, 2)} image={previewImageTwo} id="gallery2" />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage onChange={(e) => handleFileGalleryChange(e, 3)} image={previewImageThree} id="gallery3" />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage onChange={(e) => handleFileGalleryChange(e, 4)} image={previewImageFour} id="gallery4" />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage onChange={(e) => handleFileGalleryChange(e, 5)} image={previewImageFive} id="gallery5" />
                            </div>
                        </div>

                        <div className="flex mt-4 gap-4">
                            <FormControl fullWidth>
                                <InputLabel>Attribute</InputLabel>
                                <Select
                                    name="attribute"
                                    value={productData.attribute || ""}
                                    onChange={handleChange}
                                    label="Attribute"
                                >
                                    <MenuItem value="" disabled>Select Attribute</MenuItem>
                                    {AllAttributes && AllAttributes.map((att) => (
                                        <MenuItem key={att._id} value={att._id}>{att.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="attribute-value-label">Attribute Value</InputLabel>
                                <Select
                                    labelId="attribute-value-label"
                                    id="attribute_value"
                                    name="attribute_value"
                                    label="attribute_value"
                                    value={productData.attribute_value || []}
                                    onChange={handleChange}
                                    multiple
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {AllAttributesValues && AllAttributesValues.map((attributeValue) => (
                                        <MenuItem key={attributeValue} value={attributeValue}>
                                            {attributeValue}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="mt-4">
                            <FormControl fullWidth >
                                <InputLabel>Color</InputLabel>
                                <Select
                                    label="Color"
                                    name="color"
                                    value={productData?.color}
                                    onChange={handleChange}
                                    multiple
                                    renderValue={(selected) => selected?.map(id => {
                                        const selectedColor = color?.color?.find(co => co._id === id);
                                        return selectedColor ? selectedColor?.name : '';
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

                        </div>

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
        </div>
    );
};

EditProduct.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default EditProduct;



