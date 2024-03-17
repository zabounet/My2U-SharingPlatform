import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomSlider from '@react-native-community/slider';
import color from '../../public/color';







const Slider = ( {customOnValueChange }) => {
    const [sliderValue, setSliderValue] = useState(5);

    const handleSliderChange = (value) => {
      setSliderValue(value);
      customOnValueChange && customOnValueChange(value);

    };


  return (
    <View style={styles.container}>
     
      <CustomSlider
        style={styles.slider}
        minimumValue={5}
        maximumValue={25}
        value={sliderValue}
        onValueChange={handleSliderChange}
        thumbTintColor={ color.Yellow.Text }
       
        minimumTrackTintColor={ color.Blue.BackgroundHeader }
     
        
      />
        <Text style={styles.label}>Périmètre de recherche : ( {Math.round(sliderValue)} km)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
               alignItems: 'center',
               marginTop:20
                      },
      label: {
        fontSize: 18,
        
      },
      slider: { 
        width: 300, 
        transform: [{ scaleY: 2 }]
        
        
      },
  });

export default Slider;


