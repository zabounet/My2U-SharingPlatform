import {
    GET_CATEGORIES,
    GET_CATEGORIE_BY_TYPE,
    GET_CATEGORIE_BY_ID,
    POST_CATEGORIE
    } from '../actions/categorie.action';
import { Reducer } from "redux";

interface CategorieState {
    categories: JSON;
}

interface CategorieAction {
    type: string;
    payload: any;
}

const initialState = {
    categories: {}
}

const categorieReducer: Reducer<CategorieState, CategorieAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_CATEGORIES:
          return {...state, categories: action.payload}
        case GET_CATEGORIE_BY_TYPE:
            return {...state, categories: action.payload}
        case GET_CATEGORIE_BY_ID:
            return {...state, categories: action.payload}
        case POST_CATEGORIE:
            return [{...state, categories: action.payload}]
        default:
            return state;
    }
}

export default categorieReducer;
