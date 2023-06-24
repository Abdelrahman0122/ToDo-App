import { View, Text, TextInput, StyleSheet,Dimensions} from 'react-native'
import React from 'react'

var width = Dimensions.get('window').width; //full width
const CustomInput = ({ value, setValue , placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
      value={value}
      onChangeText={setValue}
       placeholder={placeholder} 
       style={styles.Input}
       secureTextEntry={secureTextEntry} />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width: width *0.8,
        textAlign: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        alignSelf: 'center',
        },
      Input: { 
        fontSize: 24,   
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        alignSelf: 'stretch',
        textAlign: 'left',
        }
})


export default CustomInput