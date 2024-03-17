import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommunauteById } from "../../actions/communaute.action";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import Socket from "../../helpers/socketHelper";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import { editUser, getUserById } from "../../actions/user.action";
import color from "../../../public/color.js";
import ButtonFull from "../../components/ButtonFull";
import { isEmpty } from "../../components/Utils";
import { NODE_URL } from "../../config.js";
import imageUploader from "../../helpers/imageUploader";
import imageRemover from "../../helpers/imageRemover";
import VDF from "../../assets/data/Villes.json";

const ProfilScreen = ({ user, communaute, navigation }) => {
  const [Editing, setEditing] = useState(false);
  const dispatch = useDispatch();  

  // TODO Gestion des intêrets et modal pour les ajouter

  // Gestion du formulaire de modifications
  const formik = useFormik({
    initialValues: {
      NomPrenom: "",
      DateDeNaissance: "",
      Genre: "",
      Ville: "",
      Interets: [],
    },
    validationSchema: Yup.object().shape({
      NomPrenom: Yup.string()
      .max(50, "Maximum 30 caractères"),
      DateDeNaissance: Yup.string()
      .max(50, "Maximum 30 caractères")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d$/,
        "La date doit-être au format JJ-MM-AAAA"
      ),
      Genre: Yup.string()
      .oneOf(["Homme", "Femme", "Autre", "Non spécifié"], "Le genre doit-être: Homme, Femme, Autre ou Non spécifié"),
      Ville: Yup.string()
      .max(50, "Maximum 30 caractères")
      .oneOf(VDF, "La ville doit-être une ville valide (pas d'accents ni de tirets"),
    }),
    onSubmit: async (values) => {
      const DatasToEdit = {
        NomPrenom: values.NomPrenom === "" ? user.NomPrenom : values.NomPrenom , 
        DateDeNaissance: values.DateDeNaissance === "" ? user.DateDeNaissance : values.DateDeNaissance , 
        Genre: values.Genre === "" ? user.Genre : values.Genre , 
        Ville: values.Ville === "" ? user.Ville : values.Ville , 
        Interets: values.Interets , 
      };
      await dispatch(editUser(user._id, DatasToEdit));
      Socket.emit("updateUser");
      setEditing(false);
    },
  });

  // Modifications du profil
  const modifProfil = () => {
    setEditing(true);
  }

  const addPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        try{
          const file = {
            uri: result.assets[0].uri,
            name: result.assets[0].uri.split('/').pop(),
            type: 'image/jpeg'
          };

          if(user.Photo === "default.jpg"){
            imageUploader(file);
          } else {
            imageRemover(user.Photo);
            imageUploader(file);
          }

          dispatch(editUser(user._id, {Photo: file.name}));
          Socket.emit("updateUser");
          setEditing(false);

        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    Socket.on("userUpdated", () => {
      dispatch(getUserById());
    })
  }, [dispatch, user, Editing])
  
  // Initialisation des données
  const userPic = NODE_URL + "/appImages/" + user.Photo;
  const createdCommu = isEmpty(user.communautésSuivies) || isEmpty(communaute)? [] : communaute.filter((commu: any) => commu.Createur === user._id);
  const followedCommu = isEmpty(user.communautésSuivies) || isEmpty(communaute) ? [] : communaute.filter((commu: any) => commu.Createur !== user._id);
  
    //! Master bidouille was here 👁️👄👁️
  const getCurrentAge = (date: string) => {
    const formattedDate = new Date().toLocaleDateString("fr-FR");

    let day = (formattedDate.slice(0, 2) as unknown as number) - (date.slice(0, 2) as unknown as number);
    let month = (formattedDate.slice(3, 5) as unknown as number) - (date.slice(3, 5) as unknown as number);
    let year = (formattedDate.slice(6) as unknown as number) -  (date.slice(6) as unknown as number);
    
    if (month < 0 || (month <= 0 && day < 0)) {
      year--;
    }

    return year;
  }

  if(!isEmpty(user) && !Editing){
    return (
        <View>
          <View style={styles.blockImg}>
            <View style={styles.imgLeft}>
              <Image source={require("../../assets/img/param.png")} />
            </View>
            <View style={styles.imgMid}>
              <Image
                source={{uri : userPic}}
                style={styles.img}
              />
              <Text style={styles.imgText}>{user.NomPrenom}</Text>
            </View>
            <Pressable onPress={() => modifProfil()} style={styles.imgRight}>
              <Image source={require("../../assets/img/stylo.png")} />
            </Pressable>
          </View>

          <View style={styles.information}>
            <View style={styles.informationBlock}>
              <Text style={styles.informationText}>Age: { getCurrentAge(user.DateDeNaissance) }</Text>
              <Text style={styles.informationText}>Ville : {user.Ville}</Text>
            </View>
            <View style={styles.informationBlock}>
              <Text style={styles.informationText}>Genre: {user.Genre}</Text>
              <Text style={styles.informationText}>Karma: {user.Karma}</Text>
            </View>
          </View>
          <View style={styles.interetBlock}>
            <Text style={styles.interetBlockTitre}>Intêrets:</Text>
            <View style={styles.blockInteret}>
              {user.Interets.map((interet: any, index: number) => (
                <Text key={index} style={styles.interet}> {interet} </Text>
              ))}
            </View>
          </View>

          <View style={styles.followSuivis}>
            <Text style={[styles.imgText, styles.marginBot, styles.center]}>
              Communautés que je suis
            </Text>
            <View style={styles.listCommunaute}>
              {!isEmpty(followedCommu) && followedCommu.map((communaute:any, index: number) => (
                <View key={index} style={styles.communauteBlock}>
                  <View style={styles.communauteImgText}>
                    <Image
                      source={{uri: NODE_URL + "/appImages/" + communaute.Photo}}
                      style={styles.imgCommunaute}
                    />
                    <Text> {communaute.Nom} </Text>
                  </View>
                  <Image
                    source={require("../../assets/img/redCross.png")}
                    style={styles.imgCross}
                  />
                </View>
              ))} 
            </View>
          </View>
          <View style={styles.listCommunautes}>
            <Text style={[styles.imgText, styles.center]}>Mes Communautés</Text>
            {!isEmpty(createdCommu) && createdCommu.map((communaute:any, index: number) => (
              <View key={index} style={styles.communautes}>
                <Image
                  source={{uri: NODE_URL + "/appImages/" + communaute.Photo}}
                  style={styles.imgCommunaute}
                />

                <Text> {communaute.Nom} </Text>
                <Image
                  source={require("../../assets/img/redCross.png")}
                  style={styles.imgCrossBig}
                />
              </View>
            ))
            }
          </View>

        <ButtonFull
          func={() => console.log("je marche")}
          contenu={"Créer ma communauté"}
        />
      </View>
    );
  }

  else if(!isEmpty(user) && Editing){
      return (
          <View>
            <View style={styles.blockImg}>
              <View style={[styles.imgMid, {position: "relative"}]}>
                <Pressable onPress={() => addPicture()} style={stylesEditing.addPicture}>
                  <Text style={stylesEditing.addPictureText}>+</Text>
                </Pressable>
                <Image
                  source={{uri : userPic}}
                  style={styles.img}
                />
                <TextInput 
                  style={[styles.imgText, stylesEditing.input]}
                  onChangeText={formik.handleChange("NomPrenom")}
                  onBlur={formik.handleBlur("NomPrenom")}
                  value={formik.values.NomPrenom}
                  placeholder= {user.NomPrenom}
                />
              </View>
            </View>

            <View style={stylesEditing.informations}>
              <TextInput 
                style={[styles.informationText, stylesEditing.input]}
                onChangeText={formik.handleChange("DateDeNaissance")}
                onBlur={formik.handleBlur("DateDeNaissance")}
                value={formik.values.DateDeNaissance}
                placeholder= {user.DateDeNaissance}
              />
              <TextInput 
                style={[styles.informationText, stylesEditing.input]}
                onChangeText={formik.handleChange("Genre")}
                onBlur={formik.handleBlur("Genre")}
                value={formik.values.Genre}
                placeholder= {user.Genre}
              />
              <TextInput 
                style={[styles.informationText, stylesEditing.input]}
                onChangeText={formik.handleChange("Ville")}
                onBlur={formik.handleBlur("Ville")}
                value={formik.values.Ville.toLowerCase().trim()}
                placeholder= {user.Ville}
              />
            </View>

            <View style={styles.interetBlock}>
              <Text style={[styles.interetBlockTitre, stylesEditing.interests]}>Modifier vos intêrets</Text>
              <View style={styles.blockInteret}>
                {user.Interets.map((interet: any, index: number) => (
                  <Text key={index} style={styles.interet}> {interet} </Text>
                ))}
              </View>
            </View>

        {formik.touched.NomPrenom && formik.errors.NomPrenom && (
          <Text>{formik.errors.NomPrenom}</Text>
        )}
        {formik.touched.DateDeNaissance && formik.errors.DateDeNaissance && (
          <Text>{formik.errors.DateDeNaissance}</Text>
        )}
        {formik.touched.Genre && formik.errors.Genre && (
          <Text>{formik.errors.Genre}</Text>
        )}
        {formik.touched.Ville && formik.errors.Ville && (
          <Text>{formik.errors.Ville}</Text>
        )}


        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
          <View style={{width:"45%"}}>
            <Pressable onPress={() => navigation.goBack()} style={stylesEditing.button}>
              <Text style={stylesEditing.textButton}>Annuler</Text>
            </Pressable>
          </View>

          <View style={{width:"45%"}}>
            <ButtonFull
              func={formik.handleSubmit}
              contenu={"Valider"}
            />
          </View>
        </View>
          
        </View>
      );
    };
}

const styles = StyleSheet.create({
  blockImg: {
    width: "100%",
    height: 250,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  imgLeft: { flex: 1, alignItems: "center" },
  imgMid: { flex: 2, alignItems: "center" },
  img: { width: 200, height: 150, borderRadius: 25 },

  imgText: { fontSize: 25 },

  imgRight: { flex: 1, alignItems: "center" },
  information: { display: "flex", flexDirection: "row", width: "100%" },
  informationBlock: { flex: 1 },
  informationText: { fontSize: 20, textAlign: "center" },
  interetBlock: {
    backgroundColor: color.Blue.BackgroundCard,
    width: "90%",

    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  blockInteret: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  interet: { padding: 5 },
  interetBlockTitre: { padding: 10 },
  followSuivis: { margin: 15 },
  followSuivisTitre: {},
  listCommunaute: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  communauteBlock: { display: "flex", flexDirection: "row" },
  imgCommunaute: { width: 60, height: 60, borderRadius: 30 },
  imgCross: { width: 15, height: 15 },
  communauteImgText: { display: "flex", flexDirection: "column" },
  marginBot: { marginBottom: 15 },
  listCommunautes: {},
  communautes: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  imgCrossBig: { width: 40, height: 40 },
  center: { textAlign: "center" },
});

const stylesEditing = StyleSheet.create({
  informations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  addPicture: {
    position:"absolute",  
    zIndex:10, 
    top:"40%", 
    left:"65%", 
    borderRadius:50, 
    backgroundColor:color.Blue.BackgroundHeader, 
    paddingHorizontal:17
  },
  addPictureText: { 
    color:color.Yellow.Text,
    fontSize:40
  },
  input : {
    backgroundColor: color.Blue.BackgroundHeader,
    height: 60,
    minWidth: "45%",
    marginVertical: 10,
    textAlign: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  interests: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
  },

  button: {
    backgroundColor:"#9B9B9B",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    margin: 20,
  },
  textButton: { color: "black", fontSize: 19 }
});
export default ProfilScreen;
