import axios from "axios";
import { NODE_URL } from "../config.js";

export const GET_CHATROOMS = "GET_CHATROOMS";
export const GET_USER_CHATROOMS = "GET_USER_CHATROOMS";
// export const GET_CHATROOM_BY_ID = "GET_CHATROOM_BY_ID"; <--  not used
export const POST_CHATROOM = "POST_CHATROOM";
export const DELETE_CHATROOM = "DELETE_CHATROOM";
export const ADD_USER_CHATROOM = "ADD_USER_CHATROOM";
export const DELETE_USER_CHATROOM = "DELETE_USER_CHATROOM";

export const getChatRooms = () : any => {
    return async (dispatch: any) => {

        const res = await axios.get(NODE_URL + "/chatRooms/getChatRooms");
        dispatch({ type: GET_CHATROOMS, payload: res.data });
    }
}

export const getUserChatRooms = () : any => {
    return async (dispatch: any) => {
        const res = await axios.get(NODE_URL + "/chatRooms/getUtilisateurChatRooms");
        dispatch({ type: GET_USER_CHATROOMS, payload: res.data });
    }
}

export const postChatRoom = (data: any) : any => {
    return async (dispatch: any) => {

        const res = await axios.post(NODE_URL + "/chatRooms/postChatRooms", data);
        dispatch({ type: POST_CHATROOM, payload: data });
    }
}

export const deleteChatRoom = (id: string) : any => {
    return async (dispatch: any) => {
        const res = await axios.delete(NODE_URL + "/chatRooms/deleteChatRooms/" + id);
        dispatch({ type: DELETE_CHATROOM, payload: id });
    }
}

export const addUserToChatRoom = (id: string, data: any) : any => {
    return async (dispatch: any) => {
        const res = await axios.post(NODE_URL + "/chatRooms/addUserToChatRoom/" + id, data);
        dispatch({ type: ADD_USER_CHATROOM, payload: data });
    }
}

export const deleteUserFromChatRoom = (id: string, data: any) : any => {
    return async (dispatch: any) => {
        const res = await axios.delete(NODE_URL + "/chatRooms/deleteUserFromChatRoom/" + id, data);
        dispatch({ type: DELETE_USER_CHATROOM, payload: data });
    }
}

