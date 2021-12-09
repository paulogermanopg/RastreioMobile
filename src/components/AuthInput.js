import React from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default props => {
    return (
        <View style={[styles.container, props.style]}>
            <FontAwesomeIcon icon={props.icon} size={20} style={styles.icon}/>
            <TextInput {...props} style={styles.input} maxLength={40}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        width: Dimensions.get('window').width * 0.9,
        color: '#222',
        fontSize: 16,
    },
    icon: {
        color: 'rgba(0,0,0,0.55)',
        marginLeft: 5,
    },
    input: {
        marginLeft: 20,
        width: '70%',
    }
})