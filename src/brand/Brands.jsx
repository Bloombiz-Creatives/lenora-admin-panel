import Card from "../components/card/Card";
import AddBrands from './AddBrands';
import PaginationV1 from '../shared/PaginationV1';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../shared/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, fetchBrand } from '../action/brandAction';
import { useSnackbar } from 'notistack';

const Brands = () => {

    const [delOpen, setDelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const { enqueueSnackbar } = useSnackbar();



    const delHandleClose = () => {
        setDelOpen(false);
    };

    const onDelete = () => {
        if (selectedItem) {
            dispatch(deleteBrand(selectedItem))
                .then(() => {
                    enqueueSnackbar("Brand deleted successfully!", { variant: "success" });
                })
                .catch((error) => {
                    enqueueSnackbar(`Failed to delete brand: ${error.message}`, { variant: "error" });
                });
            setDelOpen(false);
        }
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setDelOpen(true);
    };


    useEffect(() => {
        dispatch(fetchBrand({ name: debouncedQuery }))
    }, [dispatch, debouncedQuery])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);


    const { brand } = useSelector((state) => state.brandState)
    const datas = Array.isArray(brand?.brand) ? brand.brand : [];
    const brandPagination = brand?.paginationInfo;


    const handlePageChange = (event, newPage) => {
        dispatch(fetchBrand({ name: debouncedQuery, page: newPage + 1 }));
    };

    const currentPage = brandPagination?.currentPage || 1;
    const rowsPerPage = brandPagination?.rowsPerPage || 10;


    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <Card extra={`my-5 px-5 py-4 mx-5`}>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal text-[#151D48]">Brands</h3>
                    </div>
                    <div className="flex gap-3">
                        <AddBrands mode='add' />
                    </div>
                </div>

                <div className="mt-8 relative">
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

                <TableContainer component={Paper} className="mt-10">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell >Image</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {(currentPage - 1) * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img
                                            src={row?.image}
                                            alt={`Logo ${index + 1}`}
                                            style={{
                                                width: '50px',
                                                display: 'block',
                                                height: '50px',
                                                borderRadius: '27px',
                                                objectFit:'contain'
                                            }}
                                        />
                                    </TableCell>
                                   
                                    <TableCell >{row?.name}</TableCell>
                                    <TableCell align="center">
                                        <DeleteIcon className='cursor-pointer' onClick={() => handleDeleteClick(row._id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationV1
                        pagination={brandPagination}
                        onPageChange={handlePageChange}
                        rowsPerPage={10}
                    />
                </TableContainer>
            </Card>
            <ConfirmationModal
                delOpen={delOpen}
                delHandleClose={delHandleClose}
                onDelete={onDelete}
            />
        </div >

    )
}

export default Brands
