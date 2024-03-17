import {
  GET_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_GIVEN_ID,
  SEARCH_USERS_BY_SERVICES,
  SEARCH_USERS_BY_NAMES,
  CHECK_USER_LOGINS,
  LOG_OUT,
  CHECK_SESSION,
  POST_USER,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  REPORT_USER,
  EDIT_USER,
  ADD_COMMUNITY,
  FOLLOW_USER,
  GET_USERS_COMMUNITY,
  DELETE_COMMUNITY,
  UNFOLLOW_USER,
  DELETE_USER
} from "../actions/user.action";
import { Reducer } from "redux";

interface UserState {
  infos: JSON;
  loggedIn: boolean;
  userId: any;
}

interface UserAction {
  type: string;
  payload: any;
}

const initialState = {
  infos: {},
  loggedIn: false,
  userId: null
}

const userReducer: Reducer<UserState, UserAction> = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_USERS:
          return {...state, infos: action.payload}
        case GET_USER_BY_GIVEN_ID:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case SEARCH_USERS_BY_SERVICES:
          return {...state, infos: action.payload,}
        case SEARCH_USERS_BY_NAMES:
          return {...state, infos: action.payload,}
        case CHECK_USER_LOGINS:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case LOG_OUT:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case CHECK_SESSION:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case GET_USER_BY_ID:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case POST_USER:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
        case RESET_PASSWORD:
          return {...state, infos: action.payload}
        case CHANGE_PASSWORD:
          return {...state, infos: action.payload}
        case REPORT_USER:
          return {...state, infos: action.payload}
        case EDIT_USER:
          return {...state, loggedIn: action.payload.loggedIn, infos: action.payload.infos, userId: action.payload.userId}
          //   const updatedInfos = state.infos.map((user: any) => {
          //     if (user._id === action.payload.id) {
          //       return {
          //         ...user,
          //         content: action.payload.content,
          //       };
          //     } else {
          //       return user;
          //     }
              
          //   });
          //   return {...state, infos: updatedInfos
          // };
        case ADD_COMMUNITY:
          return {...state, infos: action.payload}
        case FOLLOW_USER:
          return {...state, infos: action.payload}
            case GET_USERS_COMMUNITY:
          return {...state, infos: action.payload}
        case DELETE_COMMUNITY:
              return {...state, infos: action.payload}
        case UNFOLLOW_USER:
          return {    ...state, infos: action.payload}
       case DELETE_USER:
        const filteredInfos = state.infos.filter((user: any) => user._id !== action.payload);
        return {
          ...state,
          infos: filteredInfos,
        };        
        default:
          return state;
      }
}

export default userReducer;