import axios from "axios"
import { NODE_URL } from '../config.js'

// ? variable d'environnement
export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const GET_USER_BY_GIVEN_ID = "GET_USER_BY_GIVEN_ID"
export const SEARCH_USERS_BY_SERVICES = "SEARCH_USERS_BY_SERVICES"
export const SEARCH_USERS_BY_NAMES = "SEARCH_USERS_BY_NAMES"
export const CHECK_USER_LOGINS = "CHECK_USER_LOGINS"
export const LOG_OUT = "LOG_OUT"
export const CHECK_SESSION = "CHECK_SESSION"
export const POST_USER = "POST_USER"
export const RESET_PASSWORD = "POST_USER"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const REPORT_USER = "REPORT_USER"
export const EDIT_USER = "EDIT_USER"
export const ADD_COMMUNITY = "ADD_COMMUNITY"
export const FOLLOW_USER = "FOLLOW_USER"
export const GET_USERS_COMMUNITY = "GET_USERS_COMMUNITY"
export const DELETE_COMMUNITY = "DELETE_COMMUNITY"
export const UNFOLLOW_USER = "UNFOLOW_USER"
export const DELETE_USER = "DELETE_USER"

// TODO revoir les urls

export const getUsers = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/utilisateurs/getUtilisateurs");
        dispatch({ type: GET_USERS, payload: res.data });
    }
}

export const getUserById = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/utilisateurs/getUtilisateurById");
        dispatch({ type: GET_USER_BY_ID, payload: res.data });
    }
}

export const getUserByGivenId = (id: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/utilisateurs/getUtilisateursByGivenId", id);
        dispatch({ type: GET_USER_BY_GIVEN_ID, payload: res.data });
    }
}

export const searchUtilisateursByServices = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/utilisateurs/searchUtilisateursByServices?q=" + data);
        dispatch({ type: SEARCH_USERS_BY_SERVICES, payload: res.data });
    }
}

export const searchUtilisateursName = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/utilisateurs/searchUtilisateursName?q=" + data);
        dispatch({ type: SEARCH_USERS_BY_NAMES, payload: res.data });
    }
}

export const checkUserLogins = (data: any) : any => {
    return async (dispatch: any) => {
        
        await axios.post(NODE_URL + "/utilisateurs/checkUtilisateurLogins", data);
        dispatch({ type: CHECK_USER_LOGINS, payload: data });
    }
}

export const logOut = () : any => {
    return async (dispatch: any) => {
        const res = await axios.get(NODE_URL + "/logout");
        dispatch({ type: LOG_OUT, payload: res.data});
    }
}

export const checkSession = () : any => {
    return async (dispatch: any) => {
        const res = await axios.get(NODE_URL + "/session");
        dispatch({ type: CHECK_SESSION, payload: res.data });
    }
}

export const postUser = (data: any) : any => {
    return async (dispatch: any) => {

        await axios.post(NODE_URL + "/utilisateurs/postUtilisateur", data);
        dispatch({ type: POST_USER, payload: data });
    }
}

export const resetPassword = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/resetPassword", data);
        dispatch({ type: RESET_PASSWORD, payload: res.data });
    }
}

export const changePassword = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/changePassword/" + id, data);
        dispatch({ type: CHANGE_PASSWORD, payload: res.data });
    }
}

export const reportUser = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/reportUtilisateur/" + id, data);
        dispatch({ type: REPORT_USER, payload: res.data });
    }
}

export const editUser = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/editUtilisateur/" + id, data);
        dispatch({ type: EDIT_USER, payload: res.data });
    }
}

export const addCommunity = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/addCommunautesUtilisateur/" + id, {Communaute: data});
        dispatch({ type: ADD_COMMUNITY, payload: res.data });
    }
}

export const followUser = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/addUtilisateursUtilisateur/" + id, data);
        dispatch({ type: FOLLOW_USER, payload: res.data });
    }
}

export const getUsersCommunity = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/utilisateurs/getUtilisateursCommunaute/" + id);
        dispatch({ type: GET_USERS_COMMUNITY, payload: res.data });
    }
}

export const deleteCommunity = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/deleteCommunautesUtilisateur/" + id, data);
        dispatch({ type: DELETE_COMMUNITY, payload: res.data });
    }
}

export const unFollowUser = (id: string, data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.put(NODE_URL + "/utilisateurs/deleteUtilisateursUtilisateur/" + id, data);
        dispatch({ type: UNFOLLOW_USER, payload: res.data });
    }
}

export const deleteUser = (id: string) : any => {
    return async (dispatch: any) => {

        const res = await axios.delete(NODE_URL + "/utilisateurs/deleteUtilisateur/" + id);
        dispatch({ type: DELETE_USER, payload: res.data });
    }
}
