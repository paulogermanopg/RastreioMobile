import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBox, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

export default function Home(props) {
    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => props.navigation.navigate('Login', {user: 'mistério'})}
                style={styles.button}>

                <FontAwesomeIcon icon={ faSignInAlt} size={80} color='#7600cc'/>   

            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Rastreio', {user: 'mistério'})}
                style={styles.button}>

                <FontAwesomeIcon icon={ faBox} size={80} color='#7600cc'/>   

            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        marginHorizontal: 20
    },
  })