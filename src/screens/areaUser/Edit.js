import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '../../components/areaUser/Header'

export default function Edit(props) {

    return (
        <View>
            <Header navigation={props.navigation} titulo={'Editar'} />
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