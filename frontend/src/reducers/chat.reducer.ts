import {
    GET_CHATS,
    ADD_MESSAGE_TO_CHAT,
    DELETE_CHAT
} from '../actions/chat.action';

import { Reducer } from "redux";

interface ChatState {
    chats: JSON;
}

interface ChatAction {
    type: string;
    payload: any;
}

const initialState = {
    chats: {}
}

const chatReducer: Reducer<ChatState, ChatAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_CHATS:
          return {...state, chats: action.payload}
        case ADD_MESSAGE_TO_CHAT:
            return [{...state, chats: action.payload}]
        case DELETE_CHAT:
            return [{...state, chats: action.payload}]
        default:
            return state;
    }
}

export default chatReducer;