import { useState } from "react";
import CustomButton from "../../../shared/CustomButton"

const EditHero = ({mode}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <CustomButton onClick={handleOpen} mode={mode} />
        </div>
    )
}

export default EditHero
