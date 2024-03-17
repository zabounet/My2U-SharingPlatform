import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import color from "../../../public/color.js";
// import CatalogueScreen from "./CatalogueScreen.js";

const Tab = createBottomTabNavigator();

const Accueil = () => {
  return (
    // <ScrollView>
    //     <SafeAreaView style={styles.height}>
    // <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
    <View>
      <Text>Accueil</Text>
    </View>
    //  </KeyboardAvoidingView>
    // </SafeAreaView>
    //  // </ScrollView>
  );
};

const Discutions = () => {
  return (
    // <ScrollView>
    //     <SafeAreaView style={styles.height}>
    // <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
    <View>
      <Text>Discutions</Text>
    </View>
    //  </KeyboardAvoidingView>
    // </SafeAreaView>
    //  // </ScrollView>
  );
};

const Filtres = () => {
  return (
    // <ScrollView>
    //     <SafeAreaView style={styles.height}>
    // <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
    <View>
      <Text>Filtres</Text>
    </View>
    //  </KeyboardAvoidingView>
    // </SafeAreaView>
    //  // </ScrollView>
  );
};

const Profil = () => {
  return (
    // <ScrollView>
    //     <SafeAreaView style={styles.height}>
    // <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
    <View>
      <Text>Profil</Text>
   
    </View>
    //  </KeyboardAvoidingView>
    // </SafeAreaView>
    //  // </ScrollView>
  );
};

const BottomNavBar = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Pressable onPress={}>
    //   <View style={styles.profil}>
    //     <Text style={styles.text}>Profil</Text>
    //   </View>
    //   </Pressable>
    //   <Pressable onPress={}>
    //   <View style={styles.parametres}>
    //     <Text style={styles.text}>Paramètres</Text>
    //   </View>
    //   </Pressable>
    //   <Pressable onPress={}>
    //   <View style={styles.catalogue}>
    //     <Text style={styles.text}>Catalogue</Text>
    //   </View>
    //   </Pressable>
    //   <Pressable onPress={}>
    //   <View style={styles.suivis}>
    //     <Text style={styles.text}>Suivis</Text>
    //   </View>
    //   </Pressable>
    // </View>
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={Accueil} />
        <Tab.Screen name="Discutions" component={Discutions} />
        <Tab.Screen name="Filtres" component={Filtres} />
        <Tab.Screen name="Profil" component={Profil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  //   height: "20%",
  //   backgroundColor: color.Green.Nav_Button,
  //   display: "flex",
  //   flexDirection: "row",
  // },
  // profil: { flex: 1, justifyContent:'center', alignItems:'center' },
  // parametres: { flex: 1,justifyContent:'center', alignItems:'center'  },
  // catalogue: { flex: 1,justifyContent:'center', alignItems:'center'  },
  // suivis: { flex: 1,justifyContent:'center', alignItems:'center'  },
  // text: {color: color.Yellow.Text,fontSize:14},
  // underline: {borderBottomWidth: 2, borderBottomColor: color.Yellow.Title}
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNavBar;
