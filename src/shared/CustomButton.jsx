import { Button } from "@mui/material"
import PropTypes from 'prop-types'



const CustomButton = ({  onClick, mode, buttonText }) => {
    console.log(mode)

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ borderRadius: '40px', paddingLeft: '40px', paddingRight: '40px', background: '#525b39', textTransform: 'none'}}
    
    >
      {buttonText ? buttonText : mode === 'add' ?  'Add' :  'Edit'}
    </Button>
  )
}
CustomButton.propTypes = {
  styles: PropTypes.string,
  onClick: PropTypes.func,
  mode: PropTypes.string,
  buttonText: PropTypes.string
}

export default CustomButton