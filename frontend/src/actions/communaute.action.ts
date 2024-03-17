import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_COMMUNAUTES = "GET_COMMUNAUTES";
export const GET_COMMUNAUTE_BY_CATEGORIE = "GET_COMMUNAUTE_BY_CATEGORIE";
export const GET_COMMUNAUTE_BY_ID = "GET_COMMUNAUTE_BY_ID";
export const GET_SEVERAL_COMMUNAUTE_BY_ID = "GET_SEVERAL_COMMUNAUTE_BY_ID";
export const SEARCH_COMMUNAUTES = "SEARCH_COMMUNAUTES";
export const POST_COMMUNAUTE = "POST_COMMUNAUTE";
export const ADD_MEMBRE_COMMUNAUTE = "ADD_MEMBRE_COMMUNAUTE";
export const DELETE_MEMBRE_COMMUNAUTE = "DELETE_MEMBRE_COMMUNAUTE";
export const DELETE_COMMUNAUTE = "DELETE_COMMUNAUTE";


// TODO revoir les urls
export const getCommunautes = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/communautes/getCommunautes");
        dispatch({ type: GET_COMMUNAUTES, payload: res.data });
    }
}

export const getCommunauteByCategorie = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/communautes/categorie/" + id);
        dispatch({ type: GET_COMMUNAUTE_BY_CATEGORIE, payload: res.data });
    }
}

export const getCommunauteById = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/communautes/getCommunauteById/" + id);
        dispatch({ type: GET_COMMUNAUTE_BY_ID, payload: res.data });
    }
}

export const getSeveralCommunauteById = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/communautes/getSeveralCommunauteById", data);
        dispatch({ type: GET_SEVERAL_COMMUNAUTE_BY_ID, payload: res.data });
    }
}

export const searchCommunautes = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/communautes/searchCommunautes?q=" + data);
        dispatch({ type: SEARCH_COMMUNAUTES, payload: res.data });
    }
}

export const postCommunaute = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/communautes", data);
        dispatch({ type: POST_COMMUNAUTE, payload: res.data });
    }
}

export const addMembreCommunaute = (id: string, data: any) : any => {
    return async (dispatch: any) => {
        
        const res = await axios.put(NODE_URL + "/communautes/addMembreCommunaute/" + id, {Membre: data});
        dispatch({ type: ADD_MEMBRE_COMMUNAUTE, payload: res.data });
    }
}

export const deleteMembreCommunaute = (id: string, data: any) : any => {
    return async (dispatch: any) => {
        
        const res = await axios.put(NODE_URL + "/communautes/deleteMembreCommunaute/" + id, {Membre: data});
        dispatch({ type: DELETE_MEMBRE_COMMUNAUTE, payload: res.data });
    }
}

export const deleteCommunaute = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.delete(NODE_URL + "/communautes/" + id);
        dispatch({ type: DELETE_COMMUNAUTE, payload: res.data });
    }
}