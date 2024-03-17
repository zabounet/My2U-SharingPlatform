import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import color from "../../public/color.js";
const MessageCommuCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={require("../assets/img/chat.jpg")} style={styles.img} />
      </View>
      <View style={styles.mid}>
        <Text style={styles.blue}>Les barjos Bricolos</Text>

        <Text>Jean : T'inquiéte frer .....</Text>
        <View style={styles.right}>
          <Text style={styles.rightText}>Il y a 5 minutes</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom:20,
    width: "85%",
    height: 100,
    backgroundColor: color.Blue.BackgroundCard,
    borderColor: color.Blue.Title,
    borderWidth: 1,
    borderRadius: 10,
    
    display:'flex',
    flexDirection: "row",
    alignItems: "center"
  },
  img: { width: 80, height: 80, borderRadius: 40 },
  left: { alignItems: "center", flex: 1 },
  mid: { flex: 2 },
  blue: { color: color.Blue.Text, fontSize: 20 },
  right: {alignItems:'flex-end', marginRight:5},
  rightText:{fontSize:10}
});
export default MessageCommuCard;
