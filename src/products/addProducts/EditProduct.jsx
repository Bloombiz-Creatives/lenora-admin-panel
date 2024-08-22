import Edit from "@mui/icons-material/Edit";
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
    fetchColors,
    GetAttributeName,
    GetAttributeValues,
    GetParentCat,
    getSub,
} from "../../action/productAction";
import { fetchBrand } from "../../action/brandAction";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProduct = ({ id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        brand: "",
        meta_title: "",
        meta_desc: "",
        attribute: "",
        attribute_value: "",
        color: "",
        parent_category: "",
        sub_category: "",
        image: "",
        gallery1: "",
        gallery2: "",
        gallery3: "",
        gallery4: "",
        gallery5: "",
    });

    useEffect(() => {
        dispatch(GetParentCat());
        dispatch(fetchBrand());
        dispatch(fetchColors());
        dispatch(GetAttributeName());
    }, [dispatch]);

    useEffect(() => {
        if (productData.attribute) {
            dispatch(GetAttributeValues(productData.attribute));
            console.log('Attribute Values:', AttributeValues); // Check what gets logged here
        }
    }, [productData.attribute, dispatch]);
    

    const {
        distinctParentCategories,
        categories = [],
        color = [],
        distinctAttributeNames,
        AttributeValues = [],
        products,
    } = useSelector((state) => state.productState);

    const parentCat = distinctParentCategories?.distinctParentCategories;
    const { brand = [] } = useSelector((state) => state.brandState);
    const AllBrands = brand?.brand;
    const AllAttributes = distinctAttributeNames?.distinctAttributeNames;
    const AllAttributesValues = AttributeValues?.AttributeValues;

    const [previewImageOne, setPreviewImageOne] = useState(null);
    const [previewImageTwo, setPreviewImageTwo] = useState(null);
    const [previewImageThree, setPreviewImageThree] = useState(null);
    const [previewImageFour, setPreviewImageFour] = useState(null);
    const [previewImageFive, setPreviewImageFive] = useState(null);

    const [previewImage, setPreviewImage] = useState();
    const [description, setDescription] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (id && products?.products) {
            const proToEdit = products.products.find((prod) => prod._id === id);
            if (proToEdit) {
                console.log('Product to Edit:', proToEdit);
                setDescription(proToEdit.description || '');

                setProductData({
                    _id: proToEdit._id,
                    name: proToEdit.name,
                    price: proToEdit.price,
                    brand: proToEdit.brand?._id || "",
                    meta_title: proToEdit.meta_title,
                    meta_desc: proToEdit.meta_desc,
                    attribute: proToEdit.attribute,
                    attribute_value: proToEdit.attribute_value,
                    color: proToEdit.color,
                    parent_category: proToEdit.category,
                    sub_category: proToEdit.sub_category,
                    image: proToEdit.image,
                    gallery1: proToEdit.gallery1,
                    gallery2: proToEdit.gallery2,
                    gallery3: proToEdit.gallery3,
                    gallery4: proToEdit.gallery4,
                    gallery5: proToEdit.gallery5,
                });


                setPreviewImage(proToEdit.image);
                setPreviewImageOne(proToEdit.gallery1);
                setPreviewImageTwo(proToEdit.gallery2);
                setPreviewImageThree(proToEdit.gallery3);
                setPreviewImageFour(proToEdit.gallery4);
                setPreviewImageFive(proToEdit.gallery5);

                if (proToEdit.category) {
                    dispatch(getSub(proToEdit.category));
                }

                if (productData.attribute) {
                    dispatch(GetAttributeValues(productData.attribute));
                    console.log('Attribute Values:', AttributeValues);
                }
            }
        }
    }, [id, products?.products, dispatch]);

    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];

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

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });

        if (name === "parent_category") {
            const trimmedValue = value.trim();
            dispatch(getSub(trimmedValue));
        }

        if (name === "attribute") {
            dispatch(GetAttributeValues(value));
            setProductData({
                ...productData,
                attribute_value: "",
            });
        }
    };

    return (
        <div>
            <Edit fontSize="small" onClick={handleOpen} />
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
                                    {parentCat &&
                                        parentCat.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
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
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.name} value={cat.name}>
                                            {cat.name}
                                        </MenuItem>
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
                            <DropzoneImage onChange={handleFileImageChange} image={previewImage} id={productData._id} />
                        </div>

                        <div className="flex gap-4 mt-4 w-full justify-center items-center">
                            <div className=' w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery1Change}
                                    image={previewImageOne}
                                    id={productData?._id}
                                />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery2Change}
                                    image={previewImageTwo}
                                    id={productData?._id}
                                />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery3Change}
                                    image={previewImageThree}
                                    id={productData?._id}
                                />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery4Change}
                                    image={previewImageFour}
                                    id={productData?._id}
                                />
                            </div>
                            <div className=' w-full'>
                                <DropzoneImage
                                    onChange={handleFileGallery5Change}
                                    image={previewImageFive}
                                    id={productData?._id}
                                />
                            </div>
                        </div>


                        <div className="flex mt-4 gap-4">
                            <FormControl fullWidth >
                                <InputLabel>Attribute</InputLabel>
                                <Select
                                    name="attribute"
                                    value={productData.attribute}
                                    onChange={handleChange}
                                    label="Attribute"
                                >
                                    <MenuItem value="" disabled>Select Attribute</MenuItem>
                                    {AllAttributes && AllAttributes.map((att) => (
                                        <MenuItem key={att._id} value={att._id}>{att.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* <FormControl fullWidth>
                                <InputLabel>Attribute Value</InputLabel>
                                <Select
                                    name="attribute_value"
                                    value={productData.attribute_value}
                                    onChange={handleChange}
                                    label="attribute_value"
                                >
                                    <MenuItem value="" disabled>Select Attribute Value</MenuItem>
                                    {AllAttributesValues && AllAttributesValues.map((val) => (
                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> */}

                            <FormControl fullWidth>
                                <InputLabel id="attribute-value-label">Attribute Value</InputLabel>
                                <Select
                                    labelId="attribute-value-label"
                                    id="attribute_value"
                                    name="attribute_value"
                                    value={productData.attribute_value}
                                    label="Select Attribute Value"
                                    onChange={handleChange}
                                >
                                    {AllAttributesValues &&
                                        AllAttributesValues.map((attributeValue) => (
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
                                    value={productData.color}
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

export default EditProduct;
