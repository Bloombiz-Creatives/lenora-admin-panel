import { deleteProdFail, deleteProdSuccess, editProFail, editProSuccess, getAttriFail, getAttriSuccess, getAttriValueFail, getAttriValueSuccess, getColorsFail, getColorsSuccess, getParent_catFail, getParent_catSuccess, getProductsFail, getProductsSuccess, getSubFail, getSubSuccess, prodAddFail, prodAddSuccess, todaysDealFail, todaysDealSuccess } from "../slice/productSlice"
import { globalDeleteService, globalGetService, globalPatchService, globalPostService, globalPutService } from "../utils/globalApiServices"


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


export const toggleTodaysDeal = (id, todaysDeal, debouncedQuery, currentPage) =>  {
    return async (dispatch) => {
        try {
            const response = await globalPatchService(`/product/${id}/todays-deal`, { todaysDeal });
            dispatch(todaysDealSuccess(response.data))
            // dispatch(fetchProducts())
            dispatch(fetchProducts({ name: debouncedQuery, page: currentPage }));
        } catch (error) {
            dispatch(todaysDealFail(error));
        }
    }
};


export const toggleFeatured = (id, featured, debouncedQuery, currentPage) =>  {
    return async (dispatch) => {
        try {
            const response = await globalPatchService(`/product/${id}/featured`, { featured });
            dispatch(todaysDealSuccess(response.data))
            // dispatch(fetchProducts())
            dispatch(fetchProducts({ name: debouncedQuery, page: currentPage }));
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
            dispatch(fetchProducts());
        } catch (error) {
            dispatch(prodAddFail(error))
        }
    }
}


export const GetParentCat = () => {
    return async (dispatch) => {
        try {
            // const response = await globalGetService('/parent_cat');
            const response = await globalGetService('/parent_category');
            dispatch(getParent_catSuccess(response.data))
        } catch (error) {
            dispatch(getParent_catFail(error))
        }
    }
}


// export const getSub = (parent_category) => {
//     return async (dispatch) => {
//         try {
//             const encodedCategory = encodeURIComponent(parent_category);
//             const response = await globalGetService(`/categories/by-parent?parent_category=${encodedCategory}`);
//             dispatch(getSubSuccess(response.data));
//         } catch (error) {
//             dispatch(getSubFail(error));
//             console.error('Error fetching subcategories:', error); 
//         }
//     }
// };

export const getSub = (id, name) => {
    return async (dispatch) => {
        try {
            // const encodedCategory = encodeURIComponent(parent_category);
            const response = await globalGetService(`/cat/${id}/name`, {name});
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
        } catch (error) {
            dispatch(getColorsFail(error))
        }
    }
}

export const fetchAllColors = () => {
    return async (dispatch) => {
        try {
            const response = await globalGetService('/color/all');
            dispatch(getColorsSuccess(response.data));
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


export const GetAttributeValues = (id) => {
    return async (dispatch) => {
        try {
            const response = await globalGetService(`/attributes/${id}/values`);
            console.log(response.data, 'Fetched Data');
            dispatch(getAttriValueSuccess(response.data))
        } catch (error) {
            dispatch(getAttriValueFail(error))
        }
    }
}

export const updateProducts = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await globalPutService(`/product/${id}`,formData);
            dispatch(editProSuccess(response.data));
            dispatch(fetchProducts())
        } catch (error) {
            dispatch(editProFail(error))
        }
    }
}