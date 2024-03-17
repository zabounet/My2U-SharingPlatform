import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_MATERIELS = "GET_MATERIELS";
export const GET_MATERIEL_BY_CATEGORIE = "GET_MATERIEL_BY_CATEGORIE";
// export const GET_MATERIEL_BY_ID = "GET_MATERIEL_BY_ID"; <--  not used
export const POST_MATERIEL = "POST_MATERIEL";

export const getMateriels = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/materiels/getMateriels");
        dispatch({ type: GET_MATERIELS, payload: res.data });
    }
}

export const getMaterielByCategorie = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/materiels/getMaterielsByCategorie/" + id);
        dispatch({ type: GET_MATERIEL_BY_CATEGORIE, payload: res.data });
    }
}

export const postMateriel = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/postMateriel", data);
        dispatch({ type: POST_MATERIEL, payload: data });
    }
}
