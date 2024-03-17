// Lancement.js
import { useIsFocused } from '@react-navigation/native';
import React, {useEffect} from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Logo150 from "../../components/Logo150";
import color from "../../../public/color.js"
import { useDispatch, useSelector } from "react-redux";
import { checkSession } from "../../actions/user.action";

const Lancement = ({ navigation }) => {
  const isFocused = useIsFocused();
  const handlePress = () => {
    // Naviguer vers la page "Présentation"
    navigation.navigate('Presentation');
  };
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    if(isFocused){
      dispatch(checkSession());
      if(users.loggedIn){
        navigation.navigate("Profil");
      }
    }
  }, [dispatch, users.loggedIn, isFocused, navigation ]);

  if(isFocused){
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{flex: 1, height:'100%'}}>
        <View style={styles.container}>
          <View> 

         
            
          
             <Text style={styles.title}>BIENVENUE</Text>
            <View style={styles.imgContainer}>
              <Logo150 />
            </View>
            <Text style={styles.text}>
              Sur My2U.
            </Text> 
           </View>
          <StatusBar />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: color.Blue.Background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.Blue.Title,
    // fontFamily: 'Pixel'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.Blue.Title,
    // fontFamily: 'Deja'
  }
});

export default Lancement;
