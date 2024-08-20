import { deleteProdFail, deleteProdSuccess, getProductsFail, getProductsSuccess, todaysDealFail, todaysDealSuccess } from "../slice/productSlice"
import { globalDeleteService, globalGetService, globalPatchService } from "../utils/globalApiServices"

export const fetchProducts = (query) => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/product', query);
            dispatch(getProductsSuccess(response.data));
        } catch (error) {
            dispatch(getProductsFail(error))
        }
    }
}


export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalDeleteService(`/product/${id}`);
            dispatch(deleteProdSuccess(response.data))
            dispatch(fetchProducts());
        } catch (error) {
            dispatch(deleteProdFail(error))
        }
    }
}


export const toggleTodaysDeal = (id, todaysDeal) =>  {
    return async (dispatch) => {
        try {
            const response = await globalPatchService(`/product/${id}/todays-deal`, { todaysDeal });
            dispatch(todaysDealSuccess(response.data))
            dispatch(fetchProducts())
        } catch (error) {
            dispatch(todaysDealFail(error));
        }
    }
};


export const toggleFeatured = (id, featured) =>  {
    return async (dispatch) => {
        try {
            const response = await globalPatchService(`/product/${id}/featured`, { featured });
            dispatch(todaysDealSuccess(response.data))
            dispatch(fetchProducts())
        } catch (error) {
            dispatch(todaysDealFail(error));
        }
    }
};

