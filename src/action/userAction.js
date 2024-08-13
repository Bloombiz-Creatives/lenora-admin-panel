import { forgetPassFail, forgetPassRequest, forgetPassSuccess } from "../slice/userSlice";
import { globalPostService } from "../utils/globalApiServices";

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