import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../components/field/InputField';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../action/userAction';
import { useSnackbar } from 'notistack';

const VerifyOtp = () => {
    const [resetPasswordOTP, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const email = location.state?.email;
    console.log(email,'otpemail....');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !resetPasswordOTP) {
            enqueueSnackbar('Email and OTP are required.', { variant: 'error' });
            return;
        }

        try {
            const response = await dispatch(verifyOtp({ email, resetPasswordOTP }));
            if (response && response.success) {
                enqueueSnackbar('OTP verified successfully!', { variant: 'success' });
                navigate('/reset-password', { state: { email , resetPasswordOTP} });
            } else {
                enqueueSnackbar('Invalid or expired OTP. Please try again.', { variant: 'error' });
            }
        } catch {
            enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-12 text-4xl font-bold text-center text-navy-700 dark:text-white">
                    OTP Verification
                </h4>
                <form onSubmit={handleSubmit}>
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="OTP"
                        placeholder="Please enter your OTP"
                        id="otp"
                        type="text"
                        value={resetPasswordOTP}
                        onChange={(value) => setOtp(value)}
                        />
                    <button className='mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#525b39] hover:bg-[#77815b] active:bg-[#6d794d]'>
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
