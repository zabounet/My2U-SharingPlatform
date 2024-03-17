import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORIE_BY_TYPE = "GET_CATEGORIE_BY_TYPE";
export const GET_CATEGORIE_BY_ID = "GET_CATEGORIE_BY_ID";
export const POST_CATEGORIE = "POST_CATEGORIE";

export const getCategories = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/categories/getCategories");
        dispatch({ type: GET_CATEGORIES, payload: res.data });
    }
}

export const getCategorieByType = (type: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/categories/getCategoriesByType/" + type);
    
        dispatch({ type: GET_CATEGORIE_BY_TYPE, payload: res.data });
    }
}

export const getCategorieById = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/categories/getCategorieById/" + id);
        dispatch({ type: GET_CATEGORIE_BY_ID, payload: res.data });
    }
}

export const postCategorie = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/categories/postCategorie", data);
        dispatch({ type: POST_CATEGORIE, payload: data });
    }
}