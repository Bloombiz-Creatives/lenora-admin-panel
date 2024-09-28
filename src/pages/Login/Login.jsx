import InputField from '../../components/field/InputField';
import { useState } from "react";
import { useSnackbar } from "notistack";
import { checkApiStatus } from "../../utils/CheckStatus";
import { adminLogin, storeToken } from './api';
import { setLocalStore } from '../../utils';


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      const data = await adminLogin(credentials);
      console.log(data, 'dasdsds');
      const success = checkApiStatus(data);
      if (success) {
        const token = data.token;
        console.log(token, 'htoken');
        setLocalStore('email', credentials.email);
        storeToken(token);
        setTimeout(() => {
          window.location.href = '/dashboard'; 
        }, 300);
      } else {
        const errorMessage = data.error || 'Invalid email or password';
        enqueueSnackbar(errorMessage, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
    }
  };

  const handleChangeName = (newValue) => {
    setCredentials(prevState => ({
      ...prevState,
      email: newValue
    }));
  };

  const handleChangePassword = (newValue) => {
    setCredentials(prevState => ({
      ...prevState,
      password: newValue
    }));
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-12 text-4xl font-bold text-center text-navy-700">
          Log In
        </h4>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email"
          placeholder="Please enter your email"
          id="email"
          type="text"
          value={credentials.email}
          onChange={handleChangeName}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Password"
          placeholder="Enter your magic spell"
          id="password"
          type="password"
          value={credentials.password}
          onChange={handleChangePassword}
        />
        <div className="flex justify-end ">
        <a href="/forgot-password" className="text-sm text-[#525b39] hover:underline">
          Forget Password?
        </a>
        </div>
        <button className='mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#525b39] hover:bg-[#77815b] active:bg-[#6d794d]' onClick={handleSubmit}>
          Login
        </button>
      
      </div>
    </div>
  );
};

export default Login;
