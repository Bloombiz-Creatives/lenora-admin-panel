import { homeHeroEditFail, homeHeroEditRequest, homeHeroEditSuccess, homeHeroGetFail, homeHeroGetRequest, homeHeroGetSuccess, pgcntntEditFail, pgcntntEditRequets, pgcntntEditSuccess, pgcntntGetFail, pgcntntGetRequets, pgcntntGetSuccess, promoEditFail, promoEditRequest, promoEditSuccess, promoGetFail, promoGetRequest, promoGetSuccess, subEditFail, subEditRequest, subEditSuccess, subGetFail, subGetRequest, subGetSuccess } from "../slice/websiteSlice";
import { globalGetService, globalPutService } from "../utils/globalApiServices";

//Home-hero-banner
export const fetchHomeHero = () => {
    return async (dispatch) => {
        try {
            dispatch(homeHeroGetRequest());
            const response = await globalGetService('/hero');
            dispatch(homeHeroGetSuccess(response.data));
            return response.data
        } catch (error) {
            dispatch(homeHeroGetFail(error));
        }
    }
}

export const editHomeHero = (id, formData) => {
    return async (dispatch) => {
        try {
            dispatch(homeHeroEditRequest());
            const response = await globalPutService(`/hero/${id}`, formData);
            dispatch(homeHeroEditSuccess(response.data));
            dispatch(fetchHomeHero())
        } catch (error) {
            dispatch(homeHeroEditFail(error));
        }
    };
};


//sub-hero
export const fetchSubHero = () => {
    return async (dispatch) => {
        try {
            dispatch(subGetRequest());
            const response = await globalGetService('/subhero');
            dispatch(subGetSuccess(response.data));
            return response.data
        } catch (error) {
            dispatch(subGetFail(error));
        }
    }
}

export const editSubHero = (id, formData) => {
    return async (dispatch) => {
        try {
            dispatch(subEditRequest());
            const response = await globalPutService(`/subhero/${id}`, formData);
            dispatch(subEditSuccess(response.data));
            dispatch(fetchSubHero())
        } catch (error) {
            dispatch(subEditFail(error));
        }
    };
};

//promo
export const fetchPromo = () => {
    return async (dispatch) => {
        try {
            dispatch(promoGetRequest());
            const response = await globalGetService('/promo');
            dispatch(promoGetSuccess(response.data));
            return response.data
        } catch (error) {
            dispatch(promoGetFail(error));
        }
    }
}


export const editPromo = (id, formData) => {
    return async (dispatch) => {
        try {
            dispatch(promoEditRequest());
            const response = await globalPutService(`/promo/${id}`, formData);
            dispatch(promoEditSuccess(response.data));
            dispatch(fetchSubHero())
        } catch (error) {
            dispatch(promoEditFail(error));
        }
    };
};

//page-contents
export const fetchHomePageContent = () => {
    return async (dispatch) => {
        try {
            dispatch(pgcntntGetRequets());
            const response = await globalGetService('/pagecontent');
            dispatch(pgcntntGetSuccess(response.data))
        } catch (error) {
            dispatch(pgcntntGetFail(error))
        }
    }
}

export const editHomePageContent = (id, formData) => {
    return async (dispatch) => {
        try {
            dispatch(pgcntntEditRequets());
            const response = await globalPutService(`/pagecontent/${id}`, formData);
            dispatch(pgcntntEditSuccess(response.data))
            dispatch(fetchHomePageContent())
        } catch (error) {
            dispatch(pgcntntEditFail(error))
        }
    }
}