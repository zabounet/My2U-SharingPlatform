import React from 'react';
import { View, Image, StyleSheet} from "react-native";

const Logo150 = () => {
    return (
        <View>
            <Image source={require('../assets/img/Logo150.png')} style={styles.img}/>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
      display:'flex'
    },
});

export default Logo150;