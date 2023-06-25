import React, { useState,AsyncStorage,useContext   } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import UserContext from '../../Context/UserContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const { setUserId } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleLogin = async () => {
    await axios
        .post('http://localhost:3000/login', {
            email,
            password,
        })
        .then((response) => {
          console.log(response);
          setUserId(response.data.user.id);
         navigation.navigate('Home');
})
        .catch((error) => {
            console.log(error);
        });
};



  const onSignUpPress = () => {
    console.warn("Cahnge screen")
    navigation.navigate('Register')
  };

  return (
    <View style={styles.container}>
        
        <Text style={styles.appName}>Todo App</Text>
      <CustomInput placeholder="email"
       value={email}
       setValue={setEmail} />

      <CustomInput placeholder="Password" value={password}
       setValue={setPassword}
        secureTextEntry />
        <CustomButton  text="Log in" 
        onPress={handleLogin}
        type="Primary"/>
        
        <CustomButton  text="Don't have an account? Register now!" 
        onPress={onSignUpPress}
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
  }
});

export default LoginScreen;