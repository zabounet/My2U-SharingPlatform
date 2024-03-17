import React, { useEffect } from "react";
import { View, StyleSheet , Pressable} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserByGivenId } from "../../actions/user.action";
import { getChats } from "../../actions/chat.action";
import Socket from "../../helpers/socketHelper";

import MessageCard from "../../components/MessageCard";
import { isEmpty } from "../../components/Utils";

const MessagePriveeScreen = ({navigation, chatRooms, users}) => {

  const dispatch = useDispatch();
  const chats = useSelector((state: any) => state.chatReducer);


  const handleNavigationToMessage = async (i: number) => { 
    Socket.emit("joinRoom", chatRooms[i]._id);
    await dispatch(getChats(chatRooms[i]._id));
    navigation.navigate("ConversationCommunaute");
  }

  if(!isEmpty(users)){
    return (
        <View style={styles.container}>
              {users.map((user: any, i: number) => (
                  <Pressable key={i} onPress={() => handleNavigationToMessage(i)}>
                    <MessageCard key={i} user={user} />
                  </Pressable>
              ))}
        </View>
    );
  }
};
const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center", marginTop: 25 },
});
export default MessagePriveeScreen;
