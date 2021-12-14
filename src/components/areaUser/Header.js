import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header(props) {

    async function logOut() {
        await AsyncStorage.clear()
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.home} onPress={() => props.navigation.navigate('Home')}>

                <Icon name='home' size={30} color='#fff' />

            </TouchableOpacity>

            <Text style={styles.titulo}>{props.titulo}</Text>

            <TouchableOpacity style={styles.logOut} onPress={() => logOut()}>

                <Icon name='sign-out' size={30} color='#fff' />

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#4b0082',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
      paddingBottom: 10,
    },
    titulo: {
        width: '75%',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    home: {
        marginLeft: 10
    },
    logOut: {
        marginRight: 10
    },
  })