import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import { Settings, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { addAttribute, deleteAttribute, fetchAttributes } from "../action/attributeAction";
import { useSnackbar } from "notistack";
import PaginationV1 from "../shared/PaginationV1";
import ConfirmationModal from "../shared/ConfirmationModal";
import EditName from "./EditName";
import { Link } from "react-router-dom";

const AllAttributes = () => {

    const [data, setData] = useState({
        name: "",
    });
    const [error, setError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [delOpen, setDelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const delHandleClose = () => {
        setDelOpen(false);
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setDelOpen(true);
    };

    const onDelete = () => {
        if (selectedItem) {
            dispatch(deleteAttribute(selectedItem))
                .then(() => {
                    enqueueSnackbar("Brand deleted successfully!", { variant: "success" });
                })
                .catch((error) => {
                    enqueueSnackbar(`Failed to delete brand: ${error.message}`, { variant: "error" });
                });
            setDelOpen(false);
        }
    };


    const validateInput = () => {
        let validationErrors = {
            name: data.name ? "" : " name is required",
        };

        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAttributes())
    }, [dispatch])

    const { attribute } = useSelector((state) => state.attributeState);
    const attributePagination = attribute?.paginationInfo;

    const currentPage = attributePagination?.currentPage || 1;
    const rowsPerPage = attributePagination?.rowsPerPage || 10;



    const handleFormSubmit = async () => {
        if (validateInput()) {
            try {
                const formData = new FormData();
                formData.append("name", data.name);

                await dispatch(addAttribute(formData))
                enqueueSnackbar("Attribute added successfully!", { variant: "success" });
                setData({ name: "" })
            } catch (error) {
                enqueueSnackbar(error.message || "Failed to update category.", { variant: "error" });
            }
        }
    }

    const onFieldChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
        setError((prevError) => ({ ...prevError, [key]: "" }));
    };

    const handlePageChange = (event, newPage) => {
        dispatch(fetchAttributes({ page: newPage + 1 }));
    };

    const handleEditClick = (item) => {
        setSelectedItem(item); 
    };

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>All Attributes</Typography>
                    <Box display="flex">
                        <TableContainer component={Paper} sx={{ width: '65%', mr: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Values</TableCell>
                                        <TableCell>Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attribute?.attribute && attribute.attribute.length > 0 ? (
                                        attribute.attribute.map((attr, index) => (
                                            <TableRow key={attr?._id}>
                                                <TableCell>
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell>{attr?.name}</TableCell>
                                                <TableCell>
                                                    {attr.value && attr?.value.map((value, index) => (
                                                        <Chip key={`${attr.id}-${index}`} label={value} size="small" sx={{ mr: 1, mb: 1 }} />
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex">
                                                        <IconButton size="small" color="" onClick={handleEditClick}>
                                                        <Link to={`/dashboard/attribute-details/${attr?._id}`}>
                                                        <Settings fontSize="small"/>
                                                            </Link>
                                                        </IconButton>
                                                        <IconButton size="small" color="success" onClick={handleEditClick}>
                                                            <EditName id={attr?._id}/>
                                                        </IconButton>
                                                        <IconButton size="small" color="error"  onClick={() => handleDeleteClick(attr?._id)}>
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <Typography align="center">No attributes found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <PaginationV1
                                pagination={attributePagination}
                                onPageChange={handlePageChange}
                                rowsPerPage={10}
                            />
                        </TableContainer>

                        <Box sx={{ width: '35%' }}>
                            <Typography variant="h6" gutterBottom>Add New Attribute</Typography>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => onFieldChange("name", e.target.value)}
                                error={!!error.name}
                                helperText={error.name}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFormSubmit}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <ConfirmationModal
                delOpen={delOpen}
                delHandleClose={delHandleClose}
                onDelete={onDelete}
            />
        </div>
    )
}

export default AllAttributes
