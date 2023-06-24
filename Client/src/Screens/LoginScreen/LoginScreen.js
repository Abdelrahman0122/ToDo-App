import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.warn("success")
  };
  const onSignUpPress = () => {
    console.warn("Cahnge screen")
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