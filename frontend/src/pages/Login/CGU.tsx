import { View, Text, StyleSheet, ScrollView, SafeAreaView,KeyboardAvoidingView  } from "react-native";
import color from "../../../public/color.js";
import ButtonFull from "../../components/ButtonFull";
const CGU = ({ navigation }) => {
    const ToInscription = () => {
      // Naviguer vers la page "Connexion"
      navigation.navigate("Inscription");
    };

  return (
    <ScrollView>
        <SafeAreaView style={styles.height}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-450} style={styles.height}>
        <View style={styles.mainContainer}>
    <View style={styles.container}>
        <View style={styles.blockTitle}>
      <Text style={styles.title}>Conditions générales d'utilisations</Text>
      </View>
     
      <View style={styles.blocParagraphe}>
      <Text>
       
        Bienvenue sur My2U ! Nous sommes ravis de vous accueillir sur notre
        plateforme en ligne dédiée au prêt et au partage de biens et de services
        entre utilisateurs. Avant d'utiliser nos services, veuillez prendre le
        temps de lire attentivement les présentes Conditions Générales
        d'Utilisations.
      </Text>

      <Text>
        En accédant à My2U et en utilisant nos services, vous acceptez les
        termes et conditions énoncés dans les présentes CGU. Si vous n'acceptez
        pas ces termes, veuillez ne pas utiliser notre plateforme.
      </Text>
      </View>
      <View style={styles.blocParagraphe}>
      <Text style={styles.lightTitre}>1. Utilisation de la Plateforme</Text>

      <Text>
        1.1 En tant qu'utilisateur de My2U, vous vous engagez à respecter les
        lois applicables et les présentes CGU.
      </Text>

      <Text>
        1.2 My2U offre une plateforme en ligne permettant aux utilisateurs de
        prêter, partager des biens ou des services sans échange d'argent.
      </Text>

      <Text>
        1.3 Vous comprenez et acceptez que toutes les transactions effectuées
        sur la plateforme sont entre utilisateurs et que My2U n'est pas partie à
        ces transactions.
      </Text>
      </View>
      <View style={styles.blocParagraphe}>
      <Text style={styles.lightTitre}>2. Responsabilité</Text>

      <Text>
        2.1 My2U n'assume aucune responsabilité quant aux biens prêtés, partagés
        ou aux services rendus entre utilisateurs.
      </Text>

      <Text>
        2.2 Les utilisateurs sont responsables de vérifier la qualité, la
        sécurité et la légalité des biens ou services échangés sur la
        plateforme.
      </Text>

      <Text>
        2.3 My2U décline toute responsabilité en cas de litige entre
        utilisateurs. Les utilisateurs sont encouragés à résoudre tout différend
        de manière amiable.
      </Text>

      <Text>
        2.4 My2U se réserve le droit de suspendre ou de résilier le compte d'un
        utilisateur en cas de non-respect des CGU.
      </Text>
      </View>
      <View style={styles.blocParagraphe}>
      <Text style={styles.lightTitre}>3. Modification des CGU</Text>

      <Text>
        3.1 My2U se réserve le droit de modifier les présentes CGU à tout
        moment. Les utilisateurs seront informés des modifications via l'e-mail
        renseigné à l'inscription.
      </Text>

      <Text>
        3.2 En continuant à utiliser My2U après la modification des CGU, vous
        acceptez les termes modifiés.
      </Text>
      </View>
      <View style={styles.blocParagraphe}>
      <Text>
        Merci de prendre le temps de lire attentivement ces CGU. Si vous avez
        des questions, n'hésitez pas à nous contacter à my2u@gmail.com.
      </Text>
      <Text>Date de la dernière mise à jour : 2024</Text>
      <ButtonFull func={ToInscription} contenu={'Retour'} />
      </View>
      
      
      
    </View>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </ScrollView>
  );
};
// const dpToPx = (dp) => PixelRatio.roundToNearestPixel(dp * (PixelRatio.get() / 160));
const styles = StyleSheet.create({
  height: {height:'100%'},
    mainContainer: {backgroundColor: color.Blue.Background},
  container: { marginLeft: 10, marginRight: 10, display:'flex'},
  blockTitle: {  display:'flex',  justifyContent:'center', marginLeft:'auto',marginRight:'auto', paddingTop:60}, // Si je lui met une taille le bouton disparait ?!
  title: {fontSize: 26, color: color.Blue.Title, textAlign:'center'},
  blocParagraphe : { marginTop:15},
  lightTitre: {fontWeight:'bold'}

});

export default CGU;
