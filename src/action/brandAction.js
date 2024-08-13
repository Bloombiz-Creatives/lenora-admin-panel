import { brandAddFail, brandAddRequest, brandAddSuccess, brandDeleteFail, brandDeleteSuccess, brandGetAllFail, brandGetAllRequest, brandGetAllSuccess } from "../slice/brandSlice";
import { globalDeleteService, globalGetService, globalPostService } from "../utils/globalApiServices";


export const addBrands = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(brandAddRequest());
            const response = await globalPostService('/brand',formData);
            dispatch(brandAddSuccess(response.data));
            dispatch(fetchBrand());
        } catch (error) {
            dispatch(brandAddFail(error))
        }
    }
}

export const fetchBrand = (query) => {
    return async (dispatch) => {
        try {
            dispatch(brandGetAllRequest());
            const response = await globalGetService('/brand', query);
            dispatch(brandGetAllSuccess(response.data));
            return response.data;
        } catch (error) {
            dispatch(brandGetAllFail(error))
        }
    }
}


export const deleteBrand = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/brand/${id}`);
            dispatch(brandDeleteSuccess(response.data))
            dispatch(fetchBrand());
        } catch (error) {
            dispatch(brandDeleteFail(error))
        }
    }
}