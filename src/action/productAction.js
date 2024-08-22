import { deleteProdFail, deleteProdSuccess, getAttriFail, getAttriSuccess, getColorsFail, getColorsSuccess, getParent_catFail, getParent_catSuccess, getProductsFail, getProductsSuccess, getSubFail, getSubSuccess, prodAddFail, prodAddSuccess, todaysDealFail, todaysDealSuccess } from "../slice/productSlice"
import { globalDeleteService, globalGetService, globalPatchService, globalPostService } from "../utils/globalApiServices"


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


export const addProducts = (formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPostService('/product', formData);
            dispatch(prodAddSuccess(response.data))
        } catch (error) {
            dispatch(prodAddFail(error))
        }
    }
}


export const GetParentCat = () => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/parent_cat');
            dispatch(getParent_catSuccess(response.data))
        } catch (error) {
            dispatch(getParent_catFail(error))
        }
    }
}


export const getSub = (parent_category) => {
    return async (dispatch) => {
        try {
            const encodedCategory = encodeURIComponent(parent_category);
            const response = await globalGetService(`/categories/by-parent?parent_category=${encodedCategory}`);
            dispatch(getSubSuccess(response.data));
        } catch (error) {
            dispatch(getSubFail(error));
            console.error('Error fetching subcategories:', error); 
        }
    }
};


export const fetchColors = () => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/color');
            dispatch(getColorsSuccess(response.data));
            console.log(response.data,'coloooor');
            
        } catch (error) {
            dispatch(getColorsFail(error))
        }
    }
}

export const GetAttributeName = () => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/attribut_name');
            dispatch(getAttriSuccess(response.data))
        } catch (error) {
            dispatch(getAttriFail(error))
        }
    }
}


export const GetAttributeValues = ({id}) => {
    return async (dispatch) => {
        try {
            const response = await globalGetService(`attributes/${id}/values`);
            dispatch(getAttriSuccess(response.data))
        } catch (error) {
            dispatch(getAttriFail(error))
        }
    }
}