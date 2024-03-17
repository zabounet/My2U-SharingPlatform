import {
    GET_COMMUNAUTES,
    GET_COMMUNAUTE_BY_CATEGORIE,
    GET_COMMUNAUTE_BY_ID,
    GET_SEVERAL_COMMUNAUTE_BY_ID,
    SEARCH_COMMUNAUTES,
    POST_COMMUNAUTE,
    ADD_MEMBRE_COMMUNAUTE,
    DELETE_MEMBRE_COMMUNAUTE,
    DELETE_COMMUNAUTE
    } from '../actions/communaute.action';
import { Reducer } from "redux";

interface CommunauteState {
    communautes: JSON;
}

interface CommunauteAction {
    type: string;
    payload: any;
}

const initialState = {
    communautes: {}
}

const communauteReducer: Reducer<CommunauteState, CommunauteAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_COMMUNAUTES:
          return {...state, communautes: action.payload}
        case GET_COMMUNAUTE_BY_CATEGORIE:
          return {...state, communautes: action.payload}
        case GET_COMMUNAUTE_BY_ID:
            return {...state, communautes: action.payload}
        case GET_SEVERAL_COMMUNAUTE_BY_ID:
            return {...state, communautes: action.payload}
        case SEARCH_COMMUNAUTES:
            return {...state, communautes: action.payload}
        case POST_COMMUNAUTE:
            return {...state, communautes: action.payload}
        case ADD_MEMBRE_COMMUNAUTE:
            return [{...state, communautes: action.payload}]
        case DELETE_MEMBRE_COMMUNAUTE:
            return {...state, communautes: action.payload}
        case DELETE_COMMUNAUTE:
            const filteredCommunautes = state.infos.filter((communaute: any) => communaute._id !== action.payload);
            return {...state, communautes: filteredCommunautes}
            default:
            return state;
    }
}

export default communauteReducer;