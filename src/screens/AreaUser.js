import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native'
import '@react-native-async-storage/async-storage'

export default function AreaUser(props) {

    const [user, setUser] = useState(null) 

    useEffect(() => {
        async function getUser(){
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response)
            setUser(json.name)
        }
        getUser()
    }, [])

    return (
        <View>
            <Text>Bom dia {user}</Text>
            
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