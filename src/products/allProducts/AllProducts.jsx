import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../action/productAction";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { Switch } from '@mui/material';
import { useSnackbar } from "notistack";
import PaginationV1 from "../../shared/PaginationV1";

const AllProducts = () => {

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const { enqueueSnackbar } = useSnackbar();
  
    useEffect(() => {
        dispatch(fetchProducts({ name: debouncedQuery }));
    }, [dispatch, debouncedQuery]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const { products } = useSelector((state) => state.productState);
    const datas = Array.isArray(products?.products) ? products.products : [];
    const productPagination = products?.paginationInfo;


    const currentPage = productPagination?.currentPage || 1;
    const rowsPerPage = productPagination?.rowsPerPage || 10;


    const [checkedStates, setCheckedStates] = useState({});
    const [checkedStatesTwo, setCheckedStatesTwo] = useState({});


    const handleChange = (event, id) => {
        setCheckedStates(prevState => ({
            ...prevState,
            [id]: event.target.checked,
        }));
    };

    
    const handleChangeTwo = (event, id) => {
        setCheckedStatesTwo(prevState => ({
            ...prevState,
            [id]: event.target.checked,
        }));
    };

    const handlePageChange = (event, newPage) => {
        dispatch(fetchProducts({ name: debouncedQuery, page: newPage + 1 }));
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>ALL PRODUCTS</Typography>

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
                        <TableContainer component={Paper} sx={{ mr: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Todays Deal</TableCell>
                                        <TableCell align="center">Featured</TableCell>
                                        <TableCell align="center">Options</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {datas.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={row?.image}
                                                    alt={`Logo ${index + 1}`}
                                                    style={{
                                                        width: '60px',
                                                        display: 'block',
                                                        height: '60px',
                                                        borderRadius: '30px',
                                                        objectFit: 'inherit'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{row?.name}</TableCell>
                                            <TableCell align="center">{row?.category}</TableCell>
                                            <TableCell align="center">
                                                <Switch
                                                    checked={checkedStates[row?._id] || false}
                                                    onChange={(e) => handleChange(e, row?._id)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Switch
                                                    checked={checkedStatesTwo[row?._id] || false}
                                                    onChange={(e) => handleChangeTwo(e, row?._id)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="flex justify-center items-center">
                                                    <IconButton size="small" color="success">
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" color="error">
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Card>
            <PaginationV1
                pagination={productPagination}
                onPageChange={handlePageChange}
                rowsPerPage={10}
            />
        </div>
    );
};

export default AllProducts;
