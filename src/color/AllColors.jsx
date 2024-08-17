import { useEffect, useState } from "react";
import Card from "../components/card/Card"
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { AddColors, deleteColor, fetchColor } from "../action/colorAction";
import { Delete } from '@mui/icons-material';
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
    IconButton,
} from '@mui/material';
import PaginationV1 from "../shared/PaginationV1";
import ConfirmationModal from "../shared/ConfirmationModal";
import EditColor from "./EditColor";

const AllColors = () => {

    const [data, setData] = useState({
        name: "",
        color_code: "",
    });

    const [error, setError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [delOpen, setDelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);


    const delHandleClose = () => {
        setDelOpen(false);
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setDelOpen(true);
    };

    const onDelete = () => {
        if (selectedItem) {
            dispatch(deleteColor(selectedItem))
                .then(() => {
                    enqueueSnackbar("Color deleted successfully!", { variant: "success" });
                })
                .catch((error) => {
                    enqueueSnackbar(`Failed to delete color: ${error.message}`, { variant: "error" });
                });
            setDelOpen(false);
        }
    };

    const validateInput = () => {
        let validationErrors = {
            name: data.name ? "" : " name is required",
            color_code: data.color_code ? "" : "color code is required",
        };

        setError(validationErrors);
        return Object.values(validationErrors).every(value => !value);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        dispatch(fetchColor({ name: debouncedQuery }));
    }, [dispatch, debouncedQuery]);


    const { color } = useSelector((state) => state.colorState);
    const colorPagination = color?.paginationInfo;

    const currentPage = colorPagination?.currentPage || 1;
    const rowsPerPage = colorPagination?.rowsPerPage || 10;

    const onFieldChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
        setError((prevError) => ({ ...prevError, [key]: "" }));
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
    };

    const handlePageChange = (event, newPage) => {
        dispatch(fetchColor({ page: newPage + 1 }));
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFormSubmit = async () => {
        if (validateInput()) {
            try {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("color_code", data.color_code);

                await dispatch(AddColors(formData))
                enqueueSnackbar("Color added successfully!", { variant: "success" });
                setData({ name: "", color_code: "" })
            } catch (error) {
                enqueueSnackbar(error.message || "Failed to update color.", { variant: "error" });
            }
        }
    }

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <Box sx={{ p: 3 }}>

                    <Typography variant="h5" gutterBottom>All Attributes</Typography>

                    <div className="mt-8 relative p-2">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5 text-[#cc]" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <input
                            type="text"
                            placeholder="Search here..."
                            style={{
                                padding: '10px 10px 10px 30px',
                                width: '50%',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                outline: 'none',
                            }}
                            value={query}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <Box display="flex">
                        <TableContainer component={Paper} sx={{ width: '65%', mr: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {color?.color && color.color.length > 0 ? (
                                        color.color.map((clr, index) => (
                                            <TableRow key={clr?._id}>
                                                <TableCell align="center">
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell align="center">{clr?.name}</TableCell>

                                                <TableCell align="center">
                                                    <div className="flex justify-center items-center">

                                                        <IconButton size="small" color="success" onClick={handleEditClick}>
                                                            <EditColor id={clr?._id}/>
                                                        </IconButton>
                                                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(clr?._id)}>
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
                                pagination={colorPagination}
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

                            <TextField
                                fullWidth
                                label="#Color code"
                                variant="outlined"
                                id="color_code"
                                type="text"
                                value={data.color_code}
                                onChange={(e) => onFieldChange("color_code", e.target.value)}
                                error={!!error.color_code}
                                helperText={error.color_code}
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

export default AllColors
