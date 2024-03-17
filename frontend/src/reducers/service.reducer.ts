import {
    GET_SERVICES,
    // GET_SERVICE_BY_ID,
    POST_SERVICE
    } from '../actions/services.action';
import { Reducer } from "redux";

interface ServiceState {
    services: JSON;
}

interface ServiceAction {
    type: string;
    payload: any;
}

const initialState = {
    services: {}
}

const serviceReducer: Reducer<ServiceState, ServiceAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_SERVICES:
          return {...state, services: action.payload}
        // case GET_SERVICE_BY_ID:
            // return {...state, services: action.payload}
        case POST_SERVICE:
            return [{...state, services: action.payload}]
        default:
            return state;
    }
}

export default serviceReducer;