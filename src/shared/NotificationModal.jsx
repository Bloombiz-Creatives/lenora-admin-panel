// import { useEffect } from 'react';
import { Modal, List, ListItem, Typography, Divider } from '@mui/material';
import { Button } from '@mui/material';

// import { clearNotifications, fetchNotify, readNotify } from '../action/notifyController';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';

const NotificationModal = ({ open, onClose }) => {
    // const dispatch = useDispatch();
    // const { notifications } = useSelector(state => state.notifyState);
    // const noti_datas = notifications?.notifications || [];
    // const { enqueueSnackbar } = useSnackbar();


    // useEffect(() => {
    //     if (open) {
    //         dispatch(fetchNotify());
    //     }
    // }, [open, dispatch]);

    // useEffect(() => {
    //     if (open) {
    //         noti_datas.forEach(notification => {
    //             if (!notification.read) {
    //                 dispatch(readNotify(notification._id));
    //             }
    //         });
    //     }
    // }, [open, noti_datas, dispatch]);


    // const handleClearNotifications = () => {
    //     dispatch(clearNotifications()).then(() => {
    //         enqueueSnackbar("Notification cleared!", { variant: "success" })
    //     })
    //     onClose();
    // };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: 20, background: 'white', margin: 'auto', marginTop: '10%', maxWidth: 600, overflowY: 'auto', maxHeight: 400, }}>
                <div className='flex justify-between'>
                    <Typography variant="h6">Notifications</Typography>
                    {/* {noti_datas?.length > 0 ? (
                        <Button onClick={handleClearNotifications} variant="contained" color="primary" >
                            Clear All
                        </Button>
                    ) : (
                        <p></p>
                    )} */}

                    {/* <p className='italic text-red-600 hover:text-gray-500'>
                        Clear All
                    </p> */}

                    <Button variant="contained" color="primary" >
                        Clear All
                    </Button>
                </div>
                <Divider sx={{ padding: 1 }} />

                {/* {noti_datas?.length > 0 ? (
                    <>
                        <List sx={{ padding: 0 }}>
                            {noti_datas?.map(notification => (

                                <ListItem
                                    key={notification?._id}
                                    sx={{
                                        backgroundColor: '#e9f7eb',
                                        borderRadius: '12px',
                                        margin: '8px 0',
                                        padding: '12px 16px',
                                    }}
                                >
                                    <div className='block'>
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(notification?.createdAt).toLocaleString()}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#1e1e1e',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {notification?.message}
                                        </Typography>

                                    </div>

                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : (
                    <>
                        <p className='flex justify-center items-center text-gray-500 h-[250px] italic'>Empty</p>
                    </>
                )} */}

                <p className='flex justify-center items-center text-gray-500 h-[250px] italic'>Empty</p>

            </div>
        </Modal>
    );
};

export default NotificationModal;
