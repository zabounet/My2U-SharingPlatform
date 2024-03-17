import {
    GET_MATERIELS,
    GET_MATERIEL_BY_CATEGORIE,
    POST_MATERIEL
    } from '../actions/materiel.action';
import { Reducer } from "redux";

interface MaterielState {
    materiels: JSON;
}

interface MaterielAction {
    type: string;
    payload: any;
}

const initialState = {
    materiels: {}
}

const materielReducer: Reducer<MaterielState, MaterielAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_MATERIELS:
          return {...state, materiels: action.payload}
        case GET_MATERIEL_BY_CATEGORIE:
            return {...state, materiels: action.payload}
        case POST_MATERIEL:
            return [{...state, materiels: action.payload}]
        default:
            return state;
    }
}

export default materielReducer;