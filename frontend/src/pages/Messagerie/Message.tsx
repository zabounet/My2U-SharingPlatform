import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChatRooms } from "../../actions/chatRoom.action";
import { getUserByGivenId } from "../../actions/user.action";
import color from "../../../public/color.js";
import HeaderRecherche from "../../components/HeaderRecherche";
import MessagePriveeScreen from "./MessagePriveeScreen";
import MessageCommunauteScreen from "./MessageCommunauteScreen";
import { isEmpty } from "../../components/Utils";

const Message = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const chatRooms = useSelector((state: any) => state.chatRoomReducer);
  const users = useSelector((state: any) => state.userReducer);

  const [tabStates, setTabStates] = useState({
    Message: true,
    Communaute: false,
  });

  const setSelected = (tab) => {
    setTabStates({
      Message: false,
      Communaute: false,

      [tab]: true,
    });
  };

  useEffect(() => {
    if(isFocused){
      dispatch(getUserChatRooms());
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (!isEmpty(chatRooms.chatRooms) && isFocused) {
      dispatch(getUserByGivenId(chatRooms.chatRooms));
    }
  }, [dispatch, isFocused, chatRooms]);
    
  if(isFocused){
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-450}
            style={styles.height}
          >
            <HeaderRecherche />

            <View style={styles.container}>
              <View
                style={[styles.message, tabStates.Message && styles.underline]}
              >
                <Pressable onPress={() => setSelected("Message")}>
                  <Text style={[styles.text, tabStates.Message && styles.bold]}>Message</Text>
                </Pressable>
              </View>
              <View
                style={[styles.message, tabStates.Communaute && styles.underline]}
              >
                <Pressable onPress={() => setSelected("Communaute")}>
                  <Text style={[styles.text, tabStates.Communaute && styles.bold]}>Communauté</Text>
                </Pressable>
              </View>
            </View>
            {!isEmpty(chatRooms.chatRooms) && !isEmpty(users.userId) && !isEmpty(users.infos) ?
              (tabStates.Message && <MessagePriveeScreen navigation={navigation} chatRooms={chatRooms.chatRooms} users={users} />) ||
              (tabStates.Communaute && <MessageCommunauteScreen navigation={navigation} />)
            : null}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  height: { height: "100%" },

  container: {
    width: "100%",
    height: 50,
    backgroundColor: color.Green.Nav_Button,
    display: "flex",
    flexDirection: "row",
  },
  message: { flex: 1, justifyContent: "center", alignItems: "center" },

  text: { color: color.Yellow.Text, fontSize: 14, paddingBottom: 10 },
  underline: { borderBottomWidth: 3, borderBottomColor: color.Yellow.Title },
  bold:{fontWeight:'bold'}
});

export default Message;
