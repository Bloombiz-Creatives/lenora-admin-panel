
// import {  useEffect, useState } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import Card from '../components/card/Card';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAttributeValue, fetchAttributes } from '../action/attributeAction';
// import { useParams } from 'react-router-dom';
// import EditValue from './EditValue';
// import { useSnackbar } from 'notistack';
// import ConfirmationModal from '../shared/ConfirmationModal';

// const AttributeDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const [delOpen, setDelOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const { enqueueSnackbar } = useSnackbar();
//     const [error, setError] = useState({});
//     const [data, setData] = useState({
//         value: "",
//     });

//     const delHandleClose = () => {
//         setDelOpen(false);
//     };

    
//     const handleDeleteClick = (itemId, index) => {
//         setSelectedItem({ itemId, index }); 
//         setDelOpen(true);
//     };

//     const onDelete = () => {
//         if (selectedItem) {
//             const { itemId, index } = selectedItem;
//             dispatch(deleteAttributeValue(id, itemId, index))
//                 .then(() => {
//                     enqueueSnackbar("Attribute value deleted successfully!", { variant: "success" });
//                 })
//                 .catch((error) => {
//                     enqueueSnackbar(`Failed to delete attribute value: ${error.message}`, { variant: "error" });
//                 });
//             setDelOpen(false);
//         }
//     };


//     useEffect(() => {
//         dispatch(fetchAttributes());
//     }, [dispatch]);

//     const { attribute } = useSelector((state) => state.attributeState);

//     const filteredAttributes = Array.isArray(attribute?.attribute) 
//         ? attribute.attribute.filter(attr => attr._id === id)
//         : [];

//     return (
//         <div>
//             <Card extra="my-5 px-5 py-4 mx-5">
//                 <div className="container mx-auto p-4">
//                     <h1 className="text-2xl font-bold mb-4">Attribute Detail</h1>
//                     <Grid container spacing={4}>
//                         <Grid item xs={12} md={8}>
//                             <h2 className="text-xl font-semibold mb-2">Liter</h2>
//                             <TableContainer component={Paper} sx={{ width: '100%' }}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>#</TableCell>
//                                             <TableCell>Value</TableCell>
//                                             <TableCell align='center'>Action</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {filteredAttributes.length > 0 ? (
//                                             filteredAttributes[0]?.value?.map((item, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell>{index + 1}</TableCell>
//                                                     <TableCell>{item}</TableCell>
//                                                     <TableCell align='center'>
//                                                         <IconButton size="small" style={{ color: '#3B82F6' }}>
//                                                             <EditValue
//                                                                 id={id}
//                                                                 index={index}
//                                                                 value={item}
//                                                             />
//                                                         </IconButton>
//                                                         <IconButton size="small" style={{ color: '#EF4444' }} onClick={() => handleDeleteClick(filteredAttributes[0]._id, index)}>
//                                                             <FaTrash />
//                                                         </IconButton>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         ) : (
//                                             <TableRow>
//                                                 <TableCell colSpan={3}>
//                                                     <Typography align="center">No attributes found</Typography>
//                                                 </TableCell>
//                                             </TableRow>
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <h2 className="text-xl font-semibold mb-2">Add New Attribute Value</h2>
//                             <form >
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
//                                     <input type="text" value={filteredAttributes[0]?.name || ''}
//                                         readOnly className="mt-1 block w-full p-2 border rounded-md bg-gray-100" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Attribute Value</label>
//                                     <input
//                                         type="text"
//                                         className="mt-1 block w-full p-2 border rounded-md"
//                                         placeholder="Name"
//                                     />
//                                 </div>
//                                 <div className='flex justify-end'>
//                                     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                                 </div>
//                             </form>
//                         </Grid>
//                     </Grid>
//                 </div>
//             </Card>
//             <ConfirmationModal
//                 delOpen={delOpen}
//                 delHandleClose={delHandleClose}
//                 onDelete={onDelete}
//             />
//         </div>
//     );
// }

// export default AttributeDetails;


import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Card from '../components/card/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAttributeValue, fetchAttributes } from '../action/attributeAction';
import { useParams } from 'react-router-dom';
import EditValue from './EditValue';
import { useSnackbar } from 'notistack';
import ConfirmationModal from '../shared/ConfirmationModal';

const AttributeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [delOpen, setDelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const delHandleClose = () => {
        setDelOpen(false);
    };

    const handleDeleteClick = (itemId, index) => {
        setSelectedItem({ itemId, index });
        setDelOpen(true);
    };

    const onDelete = () => {
        if (selectedItem) {
            const { index } = selectedItem;
            dispatch(deleteAttributeValue(id, index)) // Only pass index, not itemId
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
        dispatch(fetchAttributes());
    }, [dispatch]);

    const { attribute } = useSelector((state) => state.attributeState);

    const filteredAttributes = Array.isArray(attribute?.attribute)
        ? attribute.attribute.filter(attr => attr._id === id)
        : [];

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Attribute Detail</h1>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <h2 className="text-xl font-semibold mb-2">Liter</h2>
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
                                        {filteredAttributes.length > 0 ? (
                                            filteredAttributes[0]?.value?.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{item}</TableCell>
                                                    <TableCell align='center'>
                                                        <IconButton size="small" style={{ color: '#3B82F6' }}>
                                                            <EditValue
                                                                id={id}
                                                                index={index}
                                                                value={item}
                                                            />
                                                        </IconButton>
                                                        <IconButton size="small" style={{ color: '#EF4444' }} onClick={() => handleDeleteClick(filteredAttributes[0]._id, index)}>
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
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2 className="text-xl font-semibold mb-2">Add New Attribute Value</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
                                    <input type="text" value={filteredAttributes[0]?.name || ''}
                                        readOnly className="mt-1 block w-full p-2 border rounded-md bg-gray-100" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Attribute Value</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border rounded-md"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className='flex justify-end'>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                                </div>
                            </form>
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
}

export default AttributeDetails;
