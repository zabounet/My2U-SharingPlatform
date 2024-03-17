import {
    GET_CHATROOMS,
    GET_USER_CHATROOMS,
    POST_CHATROOM,
    DELETE_CHATROOM,
    ADD_USER_CHATROOM,
    DELETE_USER_CHATROOM
} from '../actions/chatRoom.action';
import { Reducer } from "redux";

interface ChatRoomState {
    chatRooms: JSON;
}

interface ChatRoomAction {
    type: string;
    payload: any;
}

const initialState = {
    chatRooms: {}
}

const chatRoomReducer: Reducer<ChatRoomState, ChatRoomAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_CHATROOMS:
          return {...state, chatRooms: action.payload}
        case GET_USER_CHATROOMS:
            return {...state, chatRooms: action.payload}
        case POST_CHATROOM:
            return {...state, chatRooms: action.payload}
        case DELETE_CHATROOM:
            return {...state, chatRooms: action.payload}
        case ADD_USER_CHATROOM:
            return [{...state, chatRooms: action.payload}]
        case DELETE_USER_CHATROOM:
            return [{...state, chatRooms: action.payload}]
        default:
            return state;
    }
}

export default chatRoomReducer;

