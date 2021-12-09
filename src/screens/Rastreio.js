import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function Rastreio(props) {
    return (
        <View>
            <Text>Rastreio</Text>
            <Button title='Go to Login' onPress={() => props.navigation.navigate('Login', {
                user: 'mistério',
                senha: '123'
            })} />
        </View>
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