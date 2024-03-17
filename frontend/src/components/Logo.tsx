import React from 'react';
import { View, Image} from "react-native";

const Logo = () => {
    return (
        <View>
            <Image source={require('../assets/img/Logo.png')} />
        </View>
    );
};



export default Logo;