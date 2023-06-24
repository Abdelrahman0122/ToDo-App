import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleRegister = async () => {

    if (!email || !name || !password) {
      console.warn('Please fill all fields');
      return;
    }

    await axios.post('http://localhost:3000/register', {
        email,
        name,
        password,
      })
      .then((response) => {
        // Registration successful
        console.log(response.data.message);
        console.warn(response.data.user);
        navigation.navigate('Login');
      })
      .catch((error) => {
        // Registration failed
        console.log(error);
        console.warn(error.response.data.error);
      });
  };

  const onLoginPress = () => {  
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>   
        
    <Text style={styles.appName}>Create an Account</Text>

      <CustomInput placeholder="Name"
       value={name}
       setValue={setName} />

      <CustomInput placeholder="Email" value={email}
       setValue={setEmail}/>

        <CustomInput placeholder="Password" value={password}
       setValue={setPassword}
        secureTextEntry />

        <CustomButton  text="Register" 
        onPress={handleRegister}
        type="Primary"/>
        
        <CustomButton  text="have an account? Login now!" 
        onPress={onLoginPress}
        type="Secondary"/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,

  },
  appName: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#051c60',
  }
});

export default RegisterScreen;