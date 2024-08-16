// import { useState, useEffect } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import Card from '../components/card/Card';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAttributes } from '../action/attributeAction';
// import { useParams } from 'react-router-dom';
// import EditValue from './EditValue';

// const AttributeDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchAttributes());
//     }, [dispatch]);

//     const { attribute } = useSelector((state) => state.attributeState);
//     const [filteredAttributes, setFilteredAttributes] = useState([]);

//     useEffect(() => {
//         if (attribute?.attribute) {
//             const filtered = attribute?.attribute?.filter(attr => attr._id === id);
//             setFilteredAttributes(filtered);
//         }
//     }, [id, attribute]);

//     const handleAddValue = (e) => {
//         e.preventDefault();
//     };

//     const handleEditValue = (index, value) => {
//         setEditIndex(index);
//         setNewValue(value);
//     };

//     const [editIndex, setEditIndex] = useState(null);
//     const [newValue, setNewValue] = useState('');


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
//                                                             <EditValue id={id}
//                                                                 index={index}
//                                                                 value={item}
//                                                             />
//                                                         </IconButton>
//                                                         <IconButton size="small" style={{ color: '#EF4444' }}>
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
//                             <form onSubmit={handleAddValue}>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
//                                     <input type="text" value="Liter" readOnly className="mt-1 block w-full p-2 border rounded-md bg-gray-100" />
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
//         </div>
//     )
// }

// export default AttributeDetails;
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Card from '../components/card/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributes } from '../action/attributeAction';
import { useParams } from 'react-router-dom';
import EditValue from './EditValue';

const AttributeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAttributes());
    }, [dispatch]);

    const { attribute } = useSelector((state) => state.attributeState);

    // Filtering the attributes directly from the state without storing in another state
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
                                                        <IconButton size="small" style={{ color: '#EF4444' }} >
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
                            <form >
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
        </div>
    );
}

export default AttributeDetails;
