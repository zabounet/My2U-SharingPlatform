import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserByGivenId } from "../../actions/user.action";
import { getChats } from "../../actions/chat.action";
import Socket from "../../helpers/socketHelper";

import MessageCard from "../../components/MessageCard";
import { isEmpty } from "../../components/Utils";
import { useIsFocused } from "@react-navigation/native";
import chatReducer from "../../reducers/chat.reducer";

const MessagePriveeScreen = ({ navigation, chatRooms, users }) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // const chats = useSelector((state: any) => state.chatReducer);

  // TODO Ajouter dernier message et depuis combien de temps il a été envoyé

  const handleNavigationToMessage = async (id: any) => {
    await dispatch(getUserByGivenId({ "id": id }))
    chatRooms.forEach((chatRoom: any) => {
      chatRoom.Utilisateurs.forEach((user: any) => {
        if (user._id === id) {
          dispatch(getChats(chatRoom._id));

          Socket.emit("joinRoom", chatRoom._id);
          navigation.navigate("ConversationPrivee")
        }
      })
    })
  }

  // useEffect(() => {
  //   if (!isEmpty(chatRooms.chatRooms)) {
  //     dispatch(getUserByGivenId(chatRooms.chatRooms));
  //   }
  // }, [dispatch, chatRooms]);

  if (isFocused) {
    if (!isEmpty(users.infos)) {
      return (
        <View style={styles.container}>
          {users.infos.map !== undefined && users.infos.map((user: any, i: number) => (
            <Pressable key={i} onPress={() => handleNavigationToMessage(user._id)}>
              <MessageCard key={i} user={user} />
            </Pressable>
          ))}

        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center", marginTop: 25 },
});
export default MessagePriveeScreen;
