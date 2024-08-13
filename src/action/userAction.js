import { forgetPassFail, forgetPassRequest, forgetPassSuccess, logoutFail, logoutSuccess, otpVerifyFail, otpVerifySuccess, resetPasswordFail, resetPasswordSuccess } from "../slice/userSlice";
import axiosInstance from "../utils/apiIntercepter";
import { globalGetService, globalPostService } from "../utils/globalApiServices";

export const ForgetPass = (email) => {
    return async (dispatch) => {
      try {
        dispatch(forgetPassRequest());
        const response = await globalPostService('password_forgot', { email });
        dispatch(forgetPassSuccess(response.data));
        console.log(response, 'response');
        return response.data;
      } catch (error) {
        console.log(error);
        const errorResponse = {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        };
        dispatch(forgetPassFail(errorResponse));
        return null;
      }
    }
  }


  export const verifyOtp = ({ email, resetPasswordOTP }) => {
    return async (dispatch) => {
      try {
        const response = await globalPostService('/verify_otp', { email, resetPasswordOTP });
        dispatch(otpVerifySuccess(response.data));
        return response.data;
      } catch (error) {
        dispatch(otpVerifyFail());
        throw error;
      }
    }
  }


  export const resetPassword = ({ email, resetPasswordOTP, password, confirmPassword }) => {
    return async (dispatch) => {
      try {
        const response = await globalPostService('password_reset', { email, resetPasswordOTP, password, confirmPassword });
        dispatch(resetPasswordSuccess(response.data));
        return response.data
      } catch (error) {
        dispatch(resetPasswordFail(error));
        throw error;
      }
    }
  }


  export const logoutAdmin = () => {
    return async (dispatch) => {
      try {
        const response = await globalGetService('/logout');
        if (response.data.success) {
          delete axiosInstance.defaults.headers.common['Authorization'];
          localStorage.removeItem('accessToken');
          dispatch(logoutSuccess());
          return response.data.message;
        } else {
          throw new Error('Logout failed');
        }
      } catch (error) {
        dispatch(logoutFail(error.message));
        throw error;
      }
    };
  };