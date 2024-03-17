import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_CHATS = "GET_CHATS";
// export const GET_CHAT_BY_ID = "GET_CHAT_BY_ID"; <--  not used
export const ADD_MESSAGE_TO_CHAT = "ADD_MESSAGE_TO_CHAT";
export const DELETE_CHAT = "DELETE_CHAT";

export const getChats = (id: string|number) : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/chats/getChats/" + id);
        dispatch({ type: GET_CHATS, payload: res.data });
    }
}

export const addMessageToChat = (id: string, data: any) : any => {
    return async (dispatch: any) => {
        const res = await axios.post(NODE_URL + "/chats/addMessageToChat/" + id, data);
        dispatch({ type: ADD_MESSAGE_TO_CHAT, payload: data });
    }
}

export const deleteChat = (id: string) : any => {
    return async (dispatch: any) => {
        const res = await axios.delete(NODE_URL + "/chats/deleteChat/" + id);
        dispatch({ type: DELETE_CHAT, payload: id });
    }
}
