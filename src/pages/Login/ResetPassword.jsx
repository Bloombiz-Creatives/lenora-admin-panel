import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../components/field/InputField';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../action/userAction';
import { useSnackbar } from 'notistack';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const email = location.state?.email;
    const resetPasswordOTP = location.state?.resetPasswordOTP;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            enqueueSnackbar('Password and Confirm Password are required.', { variant: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match.', { variant: 'error' });
            return;
        }

        try {
            const response = await dispatch(resetPassword({ email, resetPasswordOTP, password, confirmPassword }));
            if (response && response.success) {
                enqueueSnackbar('Password reset successfully!', { variant: 'success' });
                navigate('/login');
            } else {
                enqueueSnackbar('Failed to reset password. Please try again.', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-12 text-4xl font-bold text-center text-navy-700 dark:text-white">
                    Reset Password
                </h4>
                <form onSubmit={handleSubmit}>
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="New Password"
                        placeholder="Please enter your new password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(value) => setPassword(value)}
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Confirm Password"
                        placeholder="Please confirm your new password"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(value) => setConfirmPassword(value)}
                    />
                    <button className='mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#525b39] hover:bg-[#77815b] active:bg-[#6d794d]'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
