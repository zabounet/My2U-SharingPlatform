import React, { useState, useEffect, useRef } from "react";
import HeaderConvPrivee from "../../components/HeaderConvPrivee";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { checkSession } from "../../actions/user.action.js";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Animated
} from "react-native";
import color from "../../../public/color.js";
import { isEmpty } from "../../components/Utils";
import Socket from "../../helpers/socketHelper";
import { addMessageToChat, getChats } from "../../actions/chat.action";
import { NODE_URL } from "../../config.js";

// FIXME: Regler pb de states
// ? Retirer la bidouille pour les dispatchs

const ConversationPrivee = ({navigation, id}) => {

  const scrollViewRef = useRef(null);
  const chats = useSelector((state: any) => state.chatReducer);
  const user = useSelector((state: any) => state.userReducer);
  const dispatch = useDispatch();
  const [Writing, setWriting] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeInOut = () => {
    if(Writing !== ""){
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
    ]).start(() => fadeInOut());
  } else {
    fadeAnim.setValue(0);
  }
}
  
  const displayWriting = (e: any) => {
    if(e.nativeEvent.text.length > 0){
      Socket.emit("isWriting", (user.userId.NomPrenom + " est en train d'écrire..."))
    } else {
      Socket.emit("isWriting", "");
    }
  };
  
  const sendMessage = (message: any) => {
    dispatch(addMessageToChat(roomId, message));
    Socket.emit("message", roomId, message);
    Socket.emit("isWriting", "");
  };

  useEffect(() => {
    Socket.on("roomJoined", (room) => {
      setRoomId(room);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  }, [dispatch]);

  useEffect(() => {
    Socket.on("showWriting", (data) => {
      setWriting(data);
      fadeInOut()
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  }, [Writing]);

  useEffect(() => {
    Socket.on("messageReceived", () => {
      if (!isEmpty(roomId))
        dispatch(getChats(roomId));
        scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  }, [roomId, dispatch]);

  const formik = useFormik({
    initialValues: {
      Contenu: "",
    },
    validationSchema: Yup.object({
      Contenu: Yup.string()
        .required("Champ requis")
        .min(1, "Le message doit contenir au moins 1 caractères")
        // .matches(/^\S+$/, "Le message ne peut pas être que des espaces"),
    }),
    onSubmit: (values) => {
      const Message = {
        Auteur: user.userId._id,
        Contenu: values.Contenu,
        /* Date: new Date().toUTCString()*/ // <-- A voir
      };
      sendMessage(Message);
      formik.resetForm();
      // Keyboard.dismiss();
    },
  });
  
  return (
        <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450}>
    <View style={styles.mainContainer}>
      <HeaderConvPrivee name={user.infos.NomPrenom} picture={user.infos.Photo} navigation={navigation} />
      <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
      {!isEmpty(chats.chats) && chats.chats.Messages.map((message: any, i: number) => (

          <View key={i} style={[styles.msgContainer, 
                                  message.Auteur !== user.infos._id 
                                    ? {flexDirection: "row-reverse"} 
                                    : {flexDirection: "row"} 
                              ]}>
             <Image
              source={{uri : message.Auteur !== user.infos._id 
                              ? NODE_URL + "/appImages/" + user.userId.Photo
                              : NODE_URL + "/appImages/" + user.infos.Photo
                            }}
              style={styles.img}
            />
            <View style={{paddingHorizontal: 10}}>
              <Text style={message.Auteur !== user.infos._id
                            ? {textAlign: "right", color: color.Blue.Title} 
                            : {textAlign: "left", color: color.Blue.Title}}>
              {message.Auteur !== user.infos._id ? ("Vous") : (user.infos.NomPrenom)}
              </Text>

              <View style={message.Auteur !== user.infos._id 
                                  ? [styles.msgSelf, styles.msg] 
                                  : [styles.msgOther, styles.msg] }>
                                    
                <Text style={message.Auteur !== user.infos._id 
                              ? {color: "white", textAlign: "right"} 
                              : {color: "black", textAlign: "left"}}>{message.Contenu}</Text>
              </View>
            </View>
          </View>
        ))
      }
      <View style={styles.writingIndicatorContainer}>
       {Writing !== "" ? 
          <Image source={{uri: NODE_URL + "/appImages/" + user.infos.Photo}} style={[styles.img, {marginRight: 10}]}></Image>
        : null}
        <Animated.Text style={[styles.writingIndicator, {opacity: fadeAnim}, Writing === "" 
                      ? {paddingVertical: 0}
                      : {paddingVertical: 20}]}>
          {Writing}
        </Animated.Text>
      </View>
      </ScrollView>
      <View style={styles.msgFieldContainer}>
        <TextInput
          placeholder="Votre message"
          placeholderTextColor={color.Yellow.Text}
          onChangeText={formik.handleChange("Contenu")}
          value={formik.values.Contenu}
          onSubmitEditing={() => formik.handleSubmit()} // Update this line
          onChange={e => displayWriting(e)}
          style={styles.msgField}> 
        </TextInput>  
        <Pressable onPress={() => formik.handleSubmit()}>
          <Image source={require("../../assets/Icon/Arrow.png")} style={{width: 35, height: 20}} />
        </Pressable>
      </View>
      

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  height: { height: "100%" },
  mainContainer: { backgroundColor: color.Blue.Background, height: "100%" },
  chatContainer: { flex: 1, marginBottom: 60, padding: 10 },
  msgContainer: { display: "flex", alignItems: "center" },
  img: { width: 50, height: 50, borderRadius: 25 },
  msg: {
    width: "auto",
    maxWidth: 300,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    }, // <--------------------------- tkt frer c'est pas du tout copilot
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  msgSelf: { backgroundColor: color.Green.Nav_Button},
  msgOther: { backgroundColor: "white"},
  writingIndicatorContainer : {display: "flex", flexDirection: "row", alignItems: "center", marginBottom:20},
  writingIndicator: { color: "black", fontWeight: "bold" }, // TODO Styliser ça
  msgFieldContainer: {
    width: "100%",
    height: 60,
    backgroundColor: color.Green.Nav_Button,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  msgField: { color: color.Yellow.Text, width: "80%" },
});

export default ConversationPrivee;
