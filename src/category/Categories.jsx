
// import  { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../components/card/Card";
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     IconButton,
//     List,
//     MenuItem,
//     Menu,
// } from '@mui/material';
// import PaginationV1 from "../shared/PaginationV1";
// import { deleteCategory, fetchCategory } from "../action/categoryAction";
// import { useSnackbar } from 'notistack';
// import AddEditCategory from './AddEditCategory';

//  const Categories = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedId, setSelectedId] = useState(null);
//     const [query, setQuery] = useState('');
//     const [debouncedQuery, setDebouncedQuery] = useState(query);
//     // const [editMode, setEditMode] = useState(false);
//     const dispatch = useDispatch();
//     const { enqueueSnackbar } = useSnackbar();


//     useEffect(() => {
//         dispatch(fetchCategory({ parent_category: debouncedQuery }));
//     }, [dispatch, debouncedQuery]);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedQuery(query);
//         }, 300);
//         return () => {
//             clearTimeout(handler);
//         };
//     }, [query]);

//     const { category } = useSelector((state) => state.categoryState);
//     const datas = Array.isArray(category?.category) ? category.category : [];
//     const categoryPagination = category?.paginationInfo;

//     const handleSearchChange = (e) => {
//         setQuery(e.target.value);
//     };

//     const handleClick = (event, id) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedId(id);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//         setSelectedId(null);
//     };

//     const handleEdit = (id) => {
//         // setEditMode(true);
//         handleClose();
//         handleClick(null, id);
//     };

//     const open = Boolean(anchorEl);


//     const handlePageChange = (event, newPage) => {
//         dispatch(fetchCategory({ name: debouncedQuery, page: newPage + 1 }));
//     };

//     const currentPage = categoryPagination?.currentPage || 1;
//     const rowsPerPage = categoryPagination?.rowsPerPage || 10;


//     const handleDelete = () => {
//         if (selectedId) {
//             dispatch(deleteCategory(selectedId)).then(() => {
//                 enqueueSnackbar("Category deleted successfully!", { variant: "success" });
//             });
//         }
//         handleClose();
//     };


//     return (
//         <div>
//             <Card extra={`my-5 px-5 py-4 mx-5`}>
//                 <div className="flex justify-between">
//                     <div>
//                         <h3 className="text-[23px] font-normal text-[#151D48]">Categories</h3>
//                     </div>
//                     <div className="flex gap-3">
//                         <AddEditCategory mode="add" />
//                     </div>
//                 </div>

//                 <div className="mt-8 relative">
//                     <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5 text-[#cc]" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                         </svg>
//                     </div>

//                     <input
//                         type="text"
//                         placeholder="Search here..."
//                         style={{
//                             padding: '10px 10px 10px 30px',
//                             width: '50%',
//                             border: '1px solid #ccc',
//                             borderRadius: '5px',
//                             outline: 'none',
//                         }}
//                         value={query}
//                         onChange={handleSearchChange}
//                     />
//                 </div>

//                 <TableContainer component={Paper} className="mt-10">
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>No</TableCell>
//                                 <TableCell align="center">Image</TableCell>
//                                 <TableCell align="center">Icon</TableCell>
//                                 <TableCell align="center">Parent Category</TableCell>
//                                 <TableCell align="center">Name</TableCell>
//                                 <TableCell align="center">Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {datas.length > 0 ? (
//                                 datas.map((row, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>
//                                             {(currentPage - 1) * rowsPerPage + index + 1}
//                                         </TableCell>

//                                         <TableCell align="center">
//                                             <img
//                                                 src={row?.image}
//                                                 alt={`Logo ${index + 1}`}
//                                                 style={{
//                                                     width: '55px',
//                                                     display: 'block',
//                                                     margin: '0 auto',
//                                                     height: '55px',
//                                                     borderRadius: '27px',
//                                                     objectFit:'cover'
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <img
//                                                 src={row?.icon}
//                                                 alt={`Logo ${index + 1}`}
//                                                 style={{
//                                                     width: '45px',
//                                                     display: 'block',
//                                                     margin: '0 auto',
//                                                     height: '45px',
//                                                     borderRadius: '10px',
//                                                     objectFit:'cover',
//                                                     padding:'2px'
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">{row?.parent_category}</TableCell>
//                                         <TableCell align="center">{row?.name}</TableCell>
//                                         <TableCell align="center">
//                                             <List>
//                                                 <IconButton
//                                                     aria-label="more"
//                                                     aria-controls="long-menu"
//                                                     aria-haspopup="true"
//                                                     onClick={(event) => handleClick(event, row?._id)}
//                                                 >
//                                                     <MoreVertIcon className="text-black" />
//                                                 </IconButton>
//                                                 <Menu
//                                                     id="long-menu"
//                                                     anchorEl={anchorEl}
//                                                     keepMounted
//                                                     open={open}
//                                                     onClose={handleClose}
//                                                 >
//                                                     <MenuItem onClick={() => handleEdit(row?._id)}>
//                                                         <AddEditCategory mode="edit" id={selectedId} />
//                                                     </MenuItem>
//                                                     <MenuItem onClick={() => handleDelete(row?._id)}>
//                                                         <DeleteIcon className="mr-2" /> Delete
//                                                     </MenuItem>
//                                                 </Menu>
//                                             </List>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={4} align="center">
//                                         No categories found.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                     <PaginationV1
//                         pagination={categoryPagination}
//                         onPageChange={handlePageChange}
//                         rowsPerPage={10}
//                     />
//                 </TableContainer>
//             </Card>
//         </div>
//     );
// };


// export default Categories;




import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card/Card";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Settings} from '@mui/icons-material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    List,
    MenuItem,
    Menu,
} from '@mui/material';
import PaginationV1 from "../shared/PaginationV1";
import { deleteCategory, fetchCategory } from "../action/categoryAction";
import { useSnackbar } from 'notistack';
import AddEditCategory from './AddEditCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    // const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        dispatch(fetchCategory({ parent_category: debouncedQuery }));
    }, [dispatch, debouncedQuery]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const { category } = useSelector((state) => state.categoryState);
    const datas = Array.isArray(category?.category) ? category.category : [];
    const categoryPagination = category?.paginationInfo;

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const handleEdit = (id) => {
        // setEditMode(true);
        handleClose();
        handleClick(null, id);
    };

    const open = Boolean(anchorEl);


    const handlePageChange = (event, newPage) => {
        dispatch(fetchCategory({ name: debouncedQuery, page: newPage + 1 }));
    };

    const currentPage = categoryPagination?.currentPage || 1;
    const rowsPerPage = categoryPagination?.rowsPerPage || 10;


    const handleDelete = () => {
        if (selectedId) {
            dispatch(deleteCategory(selectedId)).then(() => {
                enqueueSnackbar("Category deleted successfully!", { variant: "success" });
            });
        }
        handleClose();
    };

    const handleEditClick = (item) => {
        setSelectedId(item); 
    };


    return (
        <div>
            <Card extra={`my-5 px-5 py-4 mx-5`}>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal text-[#151D48]">Categories</h3>
                    </div>
                    <div className="flex gap-3">
                        <AddEditCategory mode="add" />
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
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Icon</TableCell>
                                <TableCell align="center">Parent Category</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas.length > 0 ? (
                                datas.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                        </TableCell>

                                        <TableCell align="center">
                                            <img
                                                src={row?.image}
                                                alt={`Logo ${index + 1}`}
                                                style={{
                                                    width: '55px',
                                                    display: 'block',
                                                    margin: '0 auto',
                                                    height: '55px',
                                                    borderRadius: '27px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                src={row?.icon}
                                                alt={`Logo ${index + 1}`}
                                                style={{
                                                    width: '45px',
                                                    display: 'block',
                                                    margin: '0 auto',
                                                    height: '45px',
                                                    borderRadius: '10px',
                                                    objectFit: 'cover',
                                                    padding: '2px'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{row?.parent_category}</TableCell>
                                        <TableCell align="center">
                                            <div className="flex justify-center items-center">
                                                <IconButton size="small" color="" onClick={handleEditClick}>
                                                    <Link to={`/dashboard/category-details/${row?._id}`}>
                                                        <Settings fontSize="small" />
                                                    </Link>
                                                </IconButton>
                                                <List>
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={(event) => handleClick(event, row?._id)}
                                                    >
                                                        <MoreVertIcon className="text-black" />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={open}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={() => handleEdit(row?._id)}>
                                                            <AddEditCategory mode="edit" id={selectedId} />
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleDelete(row?._id)}>
                                                            <DeleteIcon className="mr-2" /> Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </List>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <PaginationV1
                        pagination={categoryPagination}
                        onPageChange={handlePageChange}
                        rowsPerPage={10}
                    />
                </TableContainer>
            </Card>
        </div>
    );
};


export default Categories;