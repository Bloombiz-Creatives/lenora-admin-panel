import { Badge, IconButton } from "@mui/material";
import NotificationModal from './NotificationModal';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from "react";


const Navbar = () => {

    const [modalOpen, setModalOpen] = useState(false);


    const handleOpenModal = () => {
        setModalOpen(true);


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
                        <NotificationsNoneIcon className="text-[#312e81] cursor-pointer" />
                    </Badge>
                </IconButton>
                <NotificationModal open={modalOpen} onClose={handleCloseModal} />

                <button>Logout</button>
            </div>

        </nav>
    )
}

export default Navbar
