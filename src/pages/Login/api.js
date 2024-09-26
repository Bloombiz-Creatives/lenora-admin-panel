import { globalPostService } from "../../utils/globalApiServices";

export const adminLogin = async(credentials)=>{
    console.log(credentials,'here in api');
try {
  const response=await  globalPostService('login',credentials);
  console.log(response,'reddd');
  return response.data
} catch (error) {
    console.log(error.response.data.message);
   return error 
}
}



export const storeToken = (token) => {
    localStorage.setItem('accessToken', token);
};
