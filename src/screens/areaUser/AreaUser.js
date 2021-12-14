import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Profile, Cadastro, Edit } from '../index'

export default function AreaUser(props) {

    const [user, setUser] = useState(null) 

    const Tab = createMaterialBottomTabNavigator()

    useEffect(() => {
        async function getUser(){
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response)
            setUser(json.name)
        }
        getUser()
    }, [])

    return (
        <Tab.Navigator
            initialRouteName="Perfil"
            inactiveColor="#888888"
            activeColor='#fff'
            barStyle={styles.tabNavigator}>

            <Tab.Screen 
                name="Perfil" component={Profile} 
                options={{
                  tabBarIcon: () => (
                    <Icon name='users' size={20} color={'#fff'}/>
                  ) 
                }}
            />

            <Tab.Screen 
                name="Cadastro" component={Cadastro} 
                options={{
                    tabBarIcon: () => (
                      <Icon name='folder' size={20} color={'#fff'}/>
                    ) 
                  }}
            />

            <Tab.Screen 
                name="Editar" component={Edit} 
                options={{
                    tabBarIcon: () => (
                      <Icon name='edit' size={20} color={'#fff'}/>
                    ) 
                  }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabNavigator: { 
        backgroundColor: '#4b0082',
        fontSize: 20,
        fontWeight: 'bold',
        color:'#333',
    }
  })