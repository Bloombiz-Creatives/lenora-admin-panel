import { globalPostService } from "../../utils/globalApiServices";

export const adminLogin = async(credentials)=>{
try {
  const response=await  globalPostService('login',credentials);
  return response.data
} catch (error) {
   return error 
}
}



export const storeToken = (token) => {
    localStorage.setItem('accessToken', token);
};
