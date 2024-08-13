import { Badge, IconButton } from "@mui/material";
import NotificationModal from './NotificationModal';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../action/userAction";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);


    const handleOpenModal = () => {
        setModalOpen(true);
    };



    const handleLogout = async () => {
        try {
            const message = await dispatch(logoutAdmin());
            enqueueSnackbar(message || 'Logout Successful!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            });
            navigate('/');
        } catch (error) {
            enqueueSnackbar(error.message || 'Logout Failed!', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            });
        }
    };

    const unreadCount = 0;

    const handleCloseModal = () => setModalOpen(false);



    return (
        <nav className="flex px-8 py-2 bg-white shadow-md w-full justify-end">
            <div className="flex gap-10 ">
                <IconButton
                    className='rounded-lg bg-[#312e81] p-1'
                    onClick={handleOpenModal}
                    color="inherit"
                // disabled={loading}
                >
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsNoneIcon className="text-[#525b39] cursor-pointer" />
                    </Badge>
                </IconButton>
                <NotificationModal open={modalOpen} onClose={handleCloseModal} />

                <button
                    style={{
                        border: '1px solid #ccc',
                        padding: '8px 12px',
                        backgroundColor: hover ? '#f0f0f0' : 'white', 
                        boxShadow: hover ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none', 
                        transition: 'background-color 0.3s, box-shadow 0.3s', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '4px', 
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleLogout}
                >
                    Logout <LogoutIcon style={{ height: 18, width: 18, marginLeft:3 }} />
                </button>
            </div>

        </nav>
    )
}

export default Navbar
