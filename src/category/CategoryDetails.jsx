

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addCategoryNames, deleteCategoryNames, fetchCategory } from "../action/categoryAction";
import { useSnackbar } from "notistack";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography, TextField, Box, Button, TablePagination } from '@mui/material';
import Card from '../components/card/Card';
import EditCatName from './EditCatName';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from "../shared/ConfirmationModal";


const CategoryDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [delOpen, setDelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({ name: "" });  // Use 'name' instead of 'value'
    const [error, setError] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const delHandleClose = () => setDelOpen(false);

    const handleDeleteClick = (itemId, index) => {
        setSelectedItem({ itemId, index });
        setDelOpen(true);
    };

    const onDelete = () => {
        if (selectedItem) {
            const { index } = selectedItem;
            dispatch(deleteCategoryNames(id, index))
                .then(() => {
                    enqueueSnackbar("Attribute value deleted successfully!", { variant: "success" });
                })
                .catch((error) => {
                    enqueueSnackbar(`Failed to delete attribute value: ${error.message}`, { variant: "error" });
                });
            setDelOpen(false);
        }
    };

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const { category } = useSelector((state) => state.categoryState);

    const filterParent_cat = Array.isArray(category?.category)
        ? category.category.filter(attr => attr._id === id)
        : [];

    const paginatedValues = filterParent_cat.length > 0 && filterParent_cat[0]?.name?.length > 0
        ? filterParent_cat[0].name.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [];

    const validateInput = () => {
        let validationErrors = { name: data.name ? "" : "Name is required" };
        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };

    const handleFormSubmit = async () => {
        if (validateInput()) {
            try {
                await dispatch(addCategoryNames(id, data.name));
                enqueueSnackbar("Category added successfully!", { variant: "success" });
                setData({ name: "" });  // Reset the form field after successful submit
            } catch (error) {
                enqueueSnackbar(error.message || "Failed to update category.", { variant: "error" });
            }
        }
    };

    const onFieldChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
        setError((prevError) => ({ ...prevError, [key]: "" }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));  // Fixed this line
        setPage(0);
    };

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Category Detail</h1>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <h2 className="text-xl font-semibold mb-2">{filterParent_cat[0]?.parent_category || ''}</h2>
                            <TableContainer component={Paper} sx={{ width: '100%' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Value</TableCell>
                                            <TableCell align='center'>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedValues.length > 0 ? (
                                            paginatedValues.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>{item}</TableCell>
                                                    <TableCell align='center'>
                                                        <IconButton size="small" style={{ color: '#525b39' }}>
                                                            <EditCatName
                                                                id={id}
                                                                index={index}
                                                                name={item}
                                                            />
                                                        </IconButton>
                                                        <IconButton size="small" style={{ color: '#EF4444' }} onClick={() => handleDeleteClick(filterParent_cat[0]._id, page * rowsPerPage + index)}>
                                                            <FaTrash />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <Typography align="center">No attributes found</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={filterParent_cat[0]?.name?.length || 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2 className="text-xl font-semibold mb-2">Add New Attribute Value</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
                                <input type="text" value={filterParent_cat[0]?.parent_category || ''}
                                    readOnly className="mt-1 block w-full p-2 border rounded-md bg-gray-100" />
                            </div>
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
                        </Grid>
                    </Grid>
                </div>
            </Card>
            <ConfirmationModal
                delOpen={delOpen}
                delHandleClose={delHandleClose}
                onDelete={onDelete}
            />
        </div>
    );
};

export default CategoryDetails;
