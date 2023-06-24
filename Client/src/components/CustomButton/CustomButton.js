import { View, Text,StyleSheet,Dimensions, Pressable} from 'react-native'
import React from 'react'


var width = Dimensions.get('window').width; //full width

const CustomButton = ({onPress, text, type}) => {
    
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
};
 
const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        textAlign: 'center',
        
        color: '#fff',
        padding: 15,
        borderRadius: 7,
        marginVertical: 10,
        },
        container_Primary: {
            backgroundColor: '#3b71f3',
        },
        
        text: {
            textAlign: 'center',
            color: '#fff',
            fontSize: 20,
        },
        text_Secondary: {
            color:"gray",
            fontSize: 17,
        }
    })

export default CustomButton