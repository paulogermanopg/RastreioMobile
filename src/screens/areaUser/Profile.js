import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../components/areaUser/Header'

export default function Profile(props) {

    return (
        <Header navigation={props.navigation} titulo={'Perfil'} />
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
  })