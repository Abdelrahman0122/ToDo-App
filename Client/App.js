import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f9fbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
