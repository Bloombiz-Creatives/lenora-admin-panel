import { attributeFetchFail, attributeFetchRequest, attributeFetchSuccess, deleteFail, deleteSuccess, nameEditFail, nameEditSuccess, nameFail, nameSuccess, updateValueFail, updateValueSuccess, valueFail, valueSuccess } from "../slice/attributeSlice"
import { globalDeleteService, globalGetService, globalPatchService, globalPostService, globalPutService } from "../utils/globalApiServices";

export const fetchAttributes = (query) => {
    return async (dispatch) => {
        try {
            dispatch(attributeFetchRequest());
            const response = await globalGetService('/attributes' , query);
            dispatch(attributeFetchSuccess(response.data));
        } catch (error) {
            dispatch(attributeFetchFail(error))
        }
    }
}

export const addAttribute = (formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPostService('/attributes',formData);
            dispatch(nameSuccess(response.data));
            dispatch(fetchAttributes());
        } catch (error) {
            dispatch(nameFail(error))
        }
    }
}

export const deleteAttribute = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/attributes/${id}`);
            dispatch(deleteSuccess(response.data));
            dispatch(fetchAttributes());
        } catch (error) {
            dispatch(deleteFail(error))
        }
    }
}

export const editAttribute = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPutService(`/attributes/${id}`, formData);
            dispatch(nameEditSuccess(response.data));
            dispatch(fetchAttributes())
        } catch (error) {
            dispatch(nameEditFail(error))
        }
    }
}

export const updateAttributeValue = (id, index, newValue) => {
    return async (dispatch) =>{
        try {
            const response = await globalPatchService(`/attributes/${id}/value`, { index, newValue });
            dispatch(updateValueSuccess(response.data));
            dispatch(fetchAttributes())
        } catch (error) {
            dispatch(updateValueFail(error))
        }
    }
};

export const deleteAttributeValue = (id, index) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/attributes/${id}/value`, { index });
            dispatch(deleteSuccess(response.data));
            dispatch(fetchAttributes());
        } catch (error) {
            dispatch(deleteFail(error));
        }
    };
};


export const addAttributeValue = (id, value) => {
    return async (dispatch) => {
        try {
            const response = await globalPostService(`/attributes/${id}/value`, {value});
            dispatch(valueSuccess(response.data));
            dispatch(fetchAttributes())
        } catch (error) {
            dispatch(valueFail(error))
        }
    }
}