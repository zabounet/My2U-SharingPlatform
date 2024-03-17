import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_SERVICES = "GET_SERVICES";
export const GET_SERVICE_BY_CATEGORIE = "GET_SERVICE_BY_CATEGORIE";
// export const GET_SERVICE_BY_ID = "GET_SERVICE_BY_ID"; <--  not used
export const POST_SERVICE = "POST_SERVICE";

export const getServices = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/services/getServices");
        dispatch({ type: GET_SERVICES, payload: res.data });
    }
}

export const getServiceByCategorie = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/services/getServicesByCategorie/" + id);
        dispatch({ type: GET_SERVICE_BY_CATEGORIE, payload: res.data });
    }
}

export const postService = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/postService", data);
        dispatch({ type: POST_SERVICE, payload: data });
    }
}

