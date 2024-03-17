import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import color from "../../public/color.js";
import { NODE_URL } from "../config.js";

const HeaderVisiteProfil = ({ name, navigation }) => {

    const goBack = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => goBack()}>
                <Image
                    source={require("../assets/Icon/Arrow.png")}
                    style={styles.arrowBack}
                />
            </Pressable>
            <View style={styles.textMiddle}>
                <Text style={[{ color: color.Green.Nav_Button }, styles.fontSize]}>{name}</Text>
            </View>
            <Pressable>
                <Text>Suivre</Text>
            </Pressable>
            <View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        padding: 20,
        height: 100,
        backgroundColor: color.Blue.BackgroundHeader,

    },
    arrowBack: {
        width: 35,
        height: 20,
        transform: [{ rotate: "180deg" }]
    },
    textMiddle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    fontSize: { fontSize: 25 },
    colorBlue: { color: color.Blue.Title },
    colorYellow: { color: color.Yellow.Title },
});

export default HeaderVisiteProfil;
