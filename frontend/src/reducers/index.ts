import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import communauteReducer from "./communaute.reducer";
import serviceReducer from "./service.reducer";
import materielReducer from "./materiel.reducer";
import categorieReducer from "./categorie.reducer";
import chatReducer from "./chat.reducer";
import chatRoomReducer from "./chatRoom.reducer";

export default combineReducers({
    userReducer,
    communauteReducer,
    serviceReducer,
    materielReducer,
    categorieReducer,
    chatReducer,
    chatRoomReducer,
})