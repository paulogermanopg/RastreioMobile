import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Home, Login, Rastreio, AreaUser } from './src/screens/index'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen 
          name="Home" component={Home}
          options={{
            title:'LOG10',
            headerStyle: {backgroundColor: '#4b0082'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
            headerTitleAlign: 'center'
          }} />

        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="Rastreio" component={Rastreio} />

        <Stack.Screen name="AreaUser" component={AreaUser} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
