import { useState } from "react";
import CustomButton from "../../../shared/CustomButton"

const EditSubHero = ({mode}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div>
            <CustomButton onClick={handleOpen} mode={mode} />


        </div>
    )
}

export default EditSubHero
