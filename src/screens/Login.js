import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Login(props) {
    return (
        <View>
            <Text>User: {props.route.params.user}</Text>
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