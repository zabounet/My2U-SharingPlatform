import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../components/Utils";
import color from "../../../public/color.js";
import { NODE_URL } from "../../config";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HeaderVisiteProfil from "../../components/HeaderVisiteProfil";
import { postChatRoom } from "../../actions/chatRoom.action";

const VisitProfilUtilisateur = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer);
    const communaute = useSelector((state: any) => state.communauteReducer);

    useEffect(() => {
        if(!isEmpty(user.infos) && user.infos._id === user.userId._id){
            // @ts-ignore
            navigation.navigate("Profil");
        }
    })

    const toChat = () => {

        const newChatRoom = {
            IsPrivate: true,
            Utilisateurs: [
                {
                    "_id": user.userId._id
                },
                {
                    "_id": user.infos._id
                }
            ]
        }

        dispatch(postChatRoom(newChatRoom));
        
        // @ts-ignore
        navigation.navigate("Message");
    }

    if (isFocused && !isEmpty(user.infos)) {
        const userPic = NODE_URL + "/appImages/" + user.infos.Photo;
        const createdCommu = isEmpty(user.infos.communautésSuivies) || isEmpty(communaute.communautes) ? [] : communaute.communautes.filter((commu: any) => commu.Createur === user.infos._id);
        const followedCommu = isEmpty(user.infos.communautésSuivies) || isEmpty(communaute.communautes) ? [] : communaute.communautes.filter((commu: any) => commu.Create !== user.infos._id);

        const getCurrentAge = (date: string) => {
            const formattedDate = new Date().toLocaleDateString("fr-FR");

            let day = (formattedDate.slice(0, 2) as unknown as number) - (date.slice(0, 2) as unknown as number);
            let month = (formattedDate.slice(3, 5) as unknown as number) - (date.slice(3, 5) as unknown as number);
            let year = (formattedDate.slice(6) as unknown as number) - (date.slice(6) as unknown as number);

            if (month < 0 || (month <= 0 && day < 0)) {
                year--;
            }

            return year;
        };

        return (
            <ScrollView style={{ flex: 1 }}>
                <HeaderVisiteProfil name={user.infos.NomPrenom} navigation={navigation} />
                <View style={styles.blockImg}>
                    <View style={styles.imgMid}>
                        <Image
                            source={{ uri: userPic }}
                            style={styles.img}
                        />
                        <Text style={styles.imgText}>{user.infos.NomPrenom}</Text>
                    </View>
                </View>

                <View style={styles.information}>
                    <View style={styles.informationBlock}>
                        <Text style={styles.informationText}>Age: {getCurrentAge(user.infos.DateDeNaissance)}</Text>
                        <Text style={styles.informationText}>Ville : {user.infos.Ville}</Text>
                    </View>
                    <View style={styles.informationBlock}>
                        <Text style={styles.informationText}>Genre: {user.infos.Genre}</Text>
                        <Text style={styles.informationText}>Karma: {user.infos.Karma}</Text>
                    </View>
                </View>
                <View style={styles.interetBlock}>
                    <Text style={styles.interetBlockTitre}>Intêrets:</Text>
                    <View style={styles.blockInteret}>
                        {user.infos.Interets.map((interet: any, index: number) => (
                            <Text key={index} style={styles.interet}> {interet} </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.followSuivis}>
                    <Text style={[styles.imgText, styles.marginBot, styles.center]}>
                        Communautés
                    </Text>
                    <View style={styles.listCommunaute}>
                        {!isEmpty(followedCommu) && followedCommu.map((communaute: any, index: number) => (
                            <View key={index} style={styles.communauteBlock}>
                                <View style={styles.communauteImgText}>
                                    <Image
                                        source={{ uri: NODE_URL + "/appImages/" + communaute.Photo }}
                                        style={styles.imgCommunaute}
                                    />
                                    <Text> {communaute.Nom} </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.listCommunautes}>
                    <Text style={[styles.imgText, styles.center]}>Ses Communautés</Text>
                    {!isEmpty(createdCommu) && createdCommu.map((communaute: any, index: number) => (
                        <View key={index} style={styles.communautes}>
                            <Image
                                source={{ uri: NODE_URL + "/appImages/" + communaute.Photo }}
                                style={styles.imgCommunaute}
                            />

                            <Text> {communaute.Nom} </Text>
                        </View>
                    ))
                    }
                </View>
                <Pressable onPress={toChat} style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <Image
                        source={require("../../assets/Icon/message.png")}
                    />
                </Pressable>
            </ScrollView>
        );
    }
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

export default VisitProfilUtilisateur;
