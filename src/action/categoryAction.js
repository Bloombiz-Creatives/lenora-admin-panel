import { catAddFail, catAddRequest, catAddSuccess, catDeleteFail, catDeleteSuccess, catEditFail, catEditRequets, catEditSuccess, catGetAllFail, catGetAllRequest, catGetAllSuccess, catNameFail, catNameSuccuss, updateCatNameFail, updateCatNameSuccess } from "../slice/categorySlice";
import { globalDeleteService, globalGetService, globalPatchService, globalPostService, globalPutService } from "../utils/globalApiServices";


export const addCategory = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(catAddRequest());
            const response  = await globalPostService('/category',formData);
            dispatch(catAddSuccess(response.data));
            dispatch(fetchCategory());
            return response;
        } catch (error) {
            dispatch(catAddFail(error))
        }
    }
}

export const updateCategory = (id, formData) => {
    return async (dispatch) => {
        try {
            dispatch(catEditRequets());
            const response = await globalPutService(`/category/${id}`, formData) ;
            dispatch(catEditSuccess(response.data)) ;
            dispatch(fetchCategory());
        } catch (error) {
            dispatch(catEditFail(error))
        }
    }
} 

export const fetchCategory = (query) => {
    return async (dispatch) => {
        try {
            dispatch(catGetAllRequest())
            const response = await globalGetService('/category',query);
            dispatch(catGetAllSuccess(response.data));
            return response.data;
        } catch (error) {
            dispatch(catGetAllFail(error))
        }
    }
}



export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/category/${id}`);
            dispatch(catDeleteSuccess(response.data));
            dispatch(fetchCategory());
        } catch (error) {
            dispatch(catDeleteFail(error));
        }
    }
}


export const addCategoryNames = (id, name) => {
    return async (dispatch) => {
        try {
            const response = await globalPostService(`/category/${id}/name`, {name});
            dispatch(catNameSuccuss(response.data));
            dispatch(fetchCategory())
        } catch (error) {
            dispatch(catNameFail(error))
        }
    }
}

export const deleteCategoryNames = (id, index) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/category/${id}/name`, { index });
            dispatch(catDeleteSuccess(response.data));
            dispatch(fetchCategory());
        } catch (error) {
            dispatch(catDeleteFail(error));
        }
    };
};


export const updateCategoryName = (id, index, newValue) => {
    return async (dispatch) =>{
        try {
            const response = await globalPatchService(`/category/${id}/name`, { index, newValue });
            dispatch(updateCatNameSuccess(response.data));
            dispatch(fetchCategory())
        } catch (error) {
            dispatch(updateCatNameFail(error))
        }
    }
};