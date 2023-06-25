import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen/RegisterScreen';
import Navigation from '/src/navigation'
import UserContext from './src/Context/UserContext';

export default function App() {
  const [userId, setUserId] = useState(""); 

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fbf1',
  },
});
