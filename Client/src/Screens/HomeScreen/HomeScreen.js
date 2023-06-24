import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import UserContext from '../../Context/UserContext';

const HomeScreen = () => {
  const { userEmail } = useContext(UserContext);
  return (
    <View>
      <Text>Welcome, {userEmail}</Text>
    </View>
  )
}

export default HomeScreen