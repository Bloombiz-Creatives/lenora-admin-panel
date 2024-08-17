import { colorAddFail, colorAddSuccess, deleteColorFail, deleteColorSuccess, editColorFail, editColorSuccess, fetchColorFail, fetchColorSuccess } from "../slice/colorSlice"
import { globalDeleteService, globalGetService, globalPostService, globalPutService } from "../utils/globalApiServices"

export const fetchColor = (query) => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/color',query);
            dispatch(fetchColorSuccess(response.data));
        } catch (error) {
            dispatch(fetchColorFail(error))
        }
    }
}

export const AddColors = (formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPostService('/color', formData);
            dispatch(colorAddSuccess(response.data));
            dispatch(fetchColor())
        } catch (error) {
            dispatch(colorAddFail(error))
        }
    }
}


export const deleteColor = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/color/${id}`);
            dispatch(deleteColorSuccess(response.data))
            dispatch(fetchColor());
        } catch (error) {
            dispatch(deleteColorFail(error))
        }
    }
}


export const editColor = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPutService(`/color/${id}`, formData);
            dispatch(editColorSuccess(response.data))
            dispatch(fetchColor());
        } catch (error) {
            dispatch(editColorFail(error))
        }
    }
}