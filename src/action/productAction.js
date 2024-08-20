import { getProductsFail, getProductsSuccess } from "../slice/productSlice"
import { globalGetService } from "../utils/globalApiServices"

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
