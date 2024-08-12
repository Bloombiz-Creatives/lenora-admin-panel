
export const checkApiStatus =(data)=>{
    // if(data.statusCode>=200){
    //     return true
    // }
    return data && data.success;
}