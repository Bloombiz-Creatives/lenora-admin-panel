import { homeHeroEditFail, homeHeroEditRequest, homeHeroEditSuccess, homeHeroGetFail, homeHeroGetRequest, homeHeroGetSuccess } from "../slice/websiteSlice";
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