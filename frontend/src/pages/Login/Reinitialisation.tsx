import React from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../actions/user.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFull from "../../components/ButtonFull";
import color from "../../../public/color.js";
import HeaderText from "../../components/HeaderText";
import { NODE_URL } from "../../config.js";

const Reinitialisation = ({ navigation }) => {
  const ToConnexion = () => {
    // Naviguer vers la page "Connexion"
    navigation.navigate("Connexion");
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object().shape({
      Email: Yup.string()
        .required("Email requis")
        .email("Email invalide")
        .max(100, "Email ne peut pas dépasser 200 caractéres"),
    }),
    onSubmit: async (values) => {
      const DonneeConnexion = {
        Email: values.Email,
      };
        await dispatch(resetPassword(DonneeConnexion));
        navigation.navigate("Connexion");
    },
  });

  return (
    <SafeAreaView style={styles.height}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-450}
        style={styles.height}
      >
        <HeaderText />
        <View style={styles.container}>
          <Text style={styles.titre}>REINITIALISATION</Text>
          <View style={styles.row}>
            <Text style={styles.LighTitre}>E-mail :</Text>
            {formik.touched.Email && formik.errors.Email && (
              <Text style={styles.errorMessage}>{formik.errors.Email}</Text>
            )}
          </View>

          <View style={styles.inputSafe}>
            <TextInput
              placeholder="Email"
              onChangeText={formik.handleChange("Email")}
              onBlur={formik.handleBlur("Email")}
              value={formik.values.Email}
              style={styles.inputMail}
            />
          </View>
        </View>
        <View style={styles.buttonMarginTop}>
          <ButtonFull func={formik.handleSubmit} contenu={"Envoyer"} />
        </View>
        <View style={styles.buttonMarginTop}>
          <Text style={styles.forgetMDP}>
            Vous allez recevoir un mail sur l'adresse indiquée pour pouvoir
            réinitialiser votre mot de passe..
          </Text>
        </View>
        <Pressable style={styles.conteneurIMG} onPress={ToConnexion}>
          <View style={styles.blockImg}>
            <Image
              source={{uri: NODE_URL + "/appImages/defaultCommunaute.jpg"}}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.conteneurText}>
              <Text style={styles.imgText}>Déjà membre ?</Text>
              <Text style={styles.imgText}>Connectez vous !</Text>
            </View>
          </View>
        </Pressable>
        <StatusBar />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
// const dpToPx = (dp) => PixelRatio.roundToNearestPixel(dp * (PixelRatio.get() / 160));
const styles = StyleSheet.create({
  height: { height: "100%" },
  container: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-around",
  },
  titre: {
    color: color.Blue.Title,
    fontSize: 24,
    textAlign: "center",
    padding: 17,
  },
  LighTitre: { fontSize: 19, marginTop: 20 },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    width: "80%",
  },
  inputSafe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgba(2, 80, 95, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(227, 232, 233, 1)",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  inputMail: { width: "100%" },
  icon: {},
  forgetMDP: {
    fontSize: 17,
    color: "rgba(138, 130, 130, 1)",
    textAlign: "center",
  },
  blockImg: {
    display: "flex",

    width: "80%",
    maxHeight: 140,
    minHeight: 200,

    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,

    opacity: 0.8,
    backgroundColor: "rgb(251, 242, 54)",
    borderRadius: 30,
  },
  conteneurIMG: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonMarginTop: { marginTop: 10 },
  conteneurText: {
    color: "white",
    alignItems: "center",

    flexDirection: "column",
  },
  imgText: { fontSize: 30, color: "white", fontWeight: "bold", padding: 15 },
  errorMessage: { fontSize: 15, marginTop: 10, color: "red" },
});

export default Reinitialisation;
