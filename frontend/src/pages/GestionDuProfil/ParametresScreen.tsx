import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import color from "../../../public/color.js";
import Slider from "../../components/Slider";
import ButtonFull from "../../components/ButtonFull";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/user.action";

const ParametresScreen = () => {
  const dispatch = useDispatch();
  const [checkboxStates, setCheckboxStates] = useState([false, false, false]);
  const [circleRadius, setCircleRadius] = useState(25);

  const toggleCheckBox = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
 

  const updateCircleRadius = (value) => {
    setCircleRadius(value * 5); // Multipliez la valeur par un facteur pour ajuster la taille
  };

  const renderCheckbox = (paramText, index) => {
    return (
      <View key={index} style={styles.param}>
        <View style={styles.paramBlockText}>
        <Text style={styles.paramText}>{paramText}:</Text>
        </View>
        <TouchableOpacity onPress={() => toggleCheckBox(index)}>
          <View
            style={[
              styles.checkbox,
              checkboxStates[index] && styles.checkedCheckbox,
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCheckboxes = () => {
    return [
      renderCheckbox('Notifications', 0),
      renderCheckbox('Vacance', 1),
      renderCheckbox('Apparence', 2),
    ];
  };

  // j'ai accés a mon state dans le style.
  const circleStyle: ViewStyle = {
    position: "absolute",
    borderWidth: 1,
    borderColor: "blue", 
    borderRadius: 100, 
    opacity: 0.5, 
    backgroundColor:color.Blue.BackgroundCard,
    marginLeft: -circleRadius, 
    marginTop: -circleRadius, 
    width: circleRadius * 2, 
    height: circleRadius * 2, 
    left: "50%", 
    top: "50%", 
  };

  return (
    <View style={styles.container}>
      <View style={styles.blockMap}>
        <Image
          source={require("../../assets/img/map.png")}
          style={styles.image}
        />
        <View style={styles.point} /> 
        <View style={circleStyle} />
        <Slider customOnValueChange={updateCircleRadius} />
      </View>
      <View style={styles.blockParametre}>
        
          {renderCheckboxes()}
          <Pressable onPress={()=> {alert('wesh tu te calme, la modale arrive')}}>
          <Text style={styles.mdp}> Modifier le mot de passe </Text>
          </Pressable>
        <ButtonFull func={() => dispatch(logOut())} contenu={"Déconnexion"} />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  blockMap: { position: "relative", alignContent:'center', justifyContent:'center',alignItems:'center' },
  image: { width: 400, height: 300, margin: 10 },
  point: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "red", // Couleur du point
    borderRadius: 5, // Pour rendre le point circulaire
    marginLeft: -5, // Déplacement de la moitié de la largeur pour centrer correctement
    marginTop: -5, // Déplacement de la moitié de la hauteur pour centrer correctement
    left: "50%", // Position au centre horizontalement
    top: "50%", // Position au centre verticalement
  },
 
  blockParametre: {},
  param: {display:'flex',flexDirection:'row', marginTop:10, marginLeft:10},
  paramText:{fontSize:22},
  paramBlockText:{flex:1},
  checkbox: {
    display:'flex',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius:15,
    backgroundColor:'lightgrey',
    marginRight:10
    
    
    
  },
 
  checkedCheckbox: {
    backgroundColor: color.Blue.BackgroundHeader, // Styling de votre checkbox cochée
  },
  mdp: {textAlign:'center', fontSize:20, marginTop:10, color:color.Blue.Text},
});

export default ParametresScreen;
