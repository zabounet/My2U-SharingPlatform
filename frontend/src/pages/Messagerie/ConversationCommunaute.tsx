import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { checkSession } from "../../actions/user.action.js";
import { View, Text, StyleSheet, ScrollView,Pressable, SafeAreaView,KeyboardAvoidingView, TextInput } from "react-native";
import color from "../../../public/color.js";
import { isEmpty } from "../../components/Utils";
import Socket from "../../helpers/socketHelper";
import { addMessageToChat, getChats } from "../../actions/chat.action";


const ConversationPrivee = () => {

  const chats = useSelector((state: any) => state.chatReducer);
  const user = useSelector((state: any) => state.userReducer);  
  const dispatch = useDispatch();


  const sendMessage = async (message: any) => {
    await dispatch(addMessageToChat(chats.chats.chatRoomId, message));
    Socket.emit("message", chats.chats.chatRoomId, message);
  }

  useEffect(() => {
    Socket.on("messageReceived", () => {
      dispatch(getChats(chats.chats.chatRoomId));
    })
  });

  const formik = useFormik({
    initialValues: {
      Contenu: "",
    },
    onSubmit: async (values) => {
      const Message = {
        Auteur: user.userId.username,
        Contenu: values.Contenu,
      };
      await sendMessage(Message);
    },
  });
  
  return (
    // <ScrollView>
        <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
    <View style={styles.mainContainer}>
      {!isEmpty(chats.chats) && chats.chats.Messages.map((message: any, i: number) => (
          <View key={i}>
            <Text>{message.Auteur}</Text>
            <Text>{message.Contenu}</Text>
          </View>
        ))
      }
      <TextInput
        placeholder="Votre message"
        onChangeText={formik.handleChange("Contenu")}
        value={formik.values.Contenu}
        onSubmitEditing={() => formik.handleSubmit()} // Update this line
        style={{width:300, height: 50, backgroundColor: "green"}}> 
      </TextInput>

        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    // </ScrollView>
  );
  };

const styles = StyleSheet.create({
  height: {height:'100%'},
  mainContainer: { },

});

export default ConversationPrivee;
