import { useState } from 'react'
import InputField from '../../components/field/InputField';
import { useDispatch } from 'react-redux';
import { ForgetPass } from '../../action/userAction';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

  const [email, setEmail] = useState()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(ForgetPass(email));
      console.log(response, 'jjjj');
      if (response && response.success) {
        enqueueSnackbar('OTP sent successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        });
        navigate('/verify-otp',{ state: { email } });
      } else {
        enqueueSnackbar('Failed to send OTP. Please try again.', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        });
      }
    } catch (error) {
      enqueueSnackbar('An error occurred. Please try again later.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      });
    }

  }

  return (
    <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-12 text-4xl font-bold text-center text-navy-700 dark:text-white">
          Forgot Password
        </h4>
        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email"
            placeholder="Please enter your email"
            id="email"
            type="text"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <button className='mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#525b39] hover:bg-[#77815b] active:bg-[#6d794d]'>
            Send Otp
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword 
