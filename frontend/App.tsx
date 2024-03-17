import React from "react";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/reducers";
import { getUsers } from "./src/actions/user.action";
// import { useFonts } from "expo-font";
import Lancement from "./src/pages/Presentation/Lancement";
import Presentation from "./src/pages/Presentation/Presentation";
import Connexion from "./src/pages/Login/Connexion";
import Inscription from "./src/pages/Login/Inscription";
import CGU from "./src/pages/Login/CGU";
import Reinitialisation from "./src/pages/Login/Reinitialisation";
import Profil from "./src/pages/GestionDuProfil/Profil";
import Message from "./src/pages/Messagerie/Message";
import ConversationPrivee from "./src/pages/Messagerie/ConversationPrivee";
import ConversationCommunaute from "./src/pages/Messagerie/ConversationCommunaute";

import MainAccueil from "./src/pages/Home/MainAccueil";
import Objets from "./src/pages/Filtrage/Filtrage";

import Recherche from "./src/pages/Recherche/Recherche";

import Messagerie from "react-native-vector-icons/AntDesign";
import color from "./public/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getCommunautes } from "./src/actions/communaute.action";
import VisitProfilUtilisateur from "./src/pages/Recherche/VisitProfilUtilisateur";

const store = configureStore({
  reducer: rootReducer,
  devTools: true // <-- Should be false in production
});

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

const App = () => {
  // ! Voir pour importé les fonts
  // const [fontsLoaded] = useFonts({
  //   "Pixel": require("./assets/fonts/Pixel.ttf"),

  // });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          {/* {page sans barre de nav en bas de la page} */}
          <Tab.Screen
            name="Lancement"
            component={Lancement}
            options={() => ({
              tabBarStyle: {
                display: "none",

              },
              tabBarButton: () => null,
              headerShown: false,
              // swipeEnabled: true,
            })}
          />
          <Tab.Screen
            name="Presentation"
            component={Presentation}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Tab.Screen
            name="Connexion"
            component={Connexion}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Tab.Screen
            name="Inscription"
            component={Inscription}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Tab.Screen
            name="CGU"
            component={CGU}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          <Tab.Screen
            name="Reinitialisation"
            component={Reinitialisation}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
              headerShown: false,
            })}
          />
          {/* Section accueil */}
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Accueil",
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={25} color={color === 'red' ? "rgba(251, 242, 54, 1)" : color} />
              ),
              headerShown: false,
              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,

              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            }}
          >
            {() => (
              <SettingsStack.Navigator>
                <Tab.Screen
                  name="MainAccueil"
                  component={MainAccueil}
                  options={{ headerShown: false }}
                />
              </SettingsStack.Navigator>
            )}
          </Tab.Screen>
          {/* espace message */}
          <Tab.Screen
            name="Messagerie"
            options={({ route }) => ({
              tabBarLabel: "Message",
              tabBarIcon: ({ color, size }) => (
                <Messagerie
                  name="message1"
                  size={25}
                  color={color === 'red' ? "rgba(251, 242, 54, 1)" : color}
                />
              ),
              headerShown: false,
              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,
              tabBarStyle: {
                display: getFocusedRouteNameFromRoute(route) === 'ConversationPrivee'
                  || getFocusedRouteNameFromRoute(route) === 'ConversationCommunaute'
                  ? 'none'
                  : 'flex'
              },
              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            })}
          >
            {() => (
              <SettingsStack.Navigator>
                <Tab.Screen
                  name="Message"
                  component={Message}
                  options={{ headerShown: false }}
                />

                <Tab.Screen
                  name="ConversationPrivee"
                  component={ConversationPrivee}
                  options={{ headerShown: false }}
                />

                <Tab.Screen
                  name="ConversationCommunaute"
                  component={ConversationCommunaute}
                  options={{ headerShown: false }}
                />
              </SettingsStack.Navigator>
            )}
          </Tab.Screen>
          {/* Filtragre */}
          <Tab.Screen
            name="Filtrage"
            options={{
              tabBarLabel: "Filtre",
              tabBarIcon: ({ color, size }) => (
                <Icon name="filter" size={25} color={color === 'red' ? "rgba(251, 242, 54, 1)" : color} />
              ),
              headerShown: false,
              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,

              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            }}
          >
            {() => (
              <SettingsStack.Navigator>
                <Tab.Screen
                  name="Objets"
                  component={Objets}
                  options={{ headerShown: false }}
                />
              </SettingsStack.Navigator>
            )}
          </Tab.Screen>

          {/* section profil */}
          <Tab.Screen
            name="Profil"
            options={{
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="account"
                  size={25}
                  color={color === 'red' ? "rgba(251, 242, 54, 1)" : color}
                />
              ),
              headerShown: false,
              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,

              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            }}
          >
            {() => (
              <SettingsStack.Navigator>
                <Tab.Screen
                  name="ProfilDetails"
                  component={Profil}
                  options={{ headerShown: false }}
                />

              </SettingsStack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Recherche"
            options={{
              tabBarButton: () => null,
              headerShown: false,

              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,

              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            }}
          > 
          {() => (
            <SettingsStack.Navigator>
              <Tab.Screen
                name="ResultatRecherche"
                component={Recherche}
                options={{ headerShown: false }}
              />
            </SettingsStack.Navigator>
          )}
          </Tab.Screen>

          <Tab.Screen
            name="VisitProfilUtilisateur"
            component={VisitProfilUtilisateur}
            options={{
              tabBarButton: () => null,
              headerShown: false,

              tabBarActiveBackgroundColor: color.Green.Nav_Button,
              tabBarActiveTintColor: color.Yellow.Title,

              tabBarLabelStyle: { height: 20 },
              tabBarInactiveBackgroundColor: color.Green.Nav_Button,
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
