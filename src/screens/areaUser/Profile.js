import React, {useEffect, useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../components/areaUser/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../../config/config.json'

export default function Profile(props) {

    const [habilitButton, setHabilitButton] = useState(true)
    const [display, setDisplay] = useState('none')
    const [userId, setUserId] = useState(null)
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [checkNewPassword, setCheckNewPassword] = useState(null)
    const [mensagem, setMensagem] = useState(null)

    useEffect(() => {
        async function getUserId () {
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response)
            setUserId(json.id)
        }
        getUserId()
    }, [])

    useEffect(() => {
        if ((newPassword != null) && (checkNewPassword != null)){
            setHabilitButton(false)
        }
        
    }, [newPassword,checkNewPassword])

    async function sendForm() {
        let response = await fetch(`${config.urlRoot}verifyPassword`, {
            method: 'POST',
            body: JSON.stringify({
                id: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                checkNewPassword: checkNewPassword
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json()
        setMensagem(json)

        if(json == "Senha atualizada com sucesso :)"){
            setOldPassword(null)
            setNewPassword(null)
            setCheckNewPassword(null)
        }

        setDisplay('flex')
        setTimeout(() => {
            setDisplay('none')
        }, 5000)
    }

    return (
        <View>

            <Header navigation={props.navigation} titulo={'Perfil'} />

            <View style={styles.container}>

                <Text style={styles.titulo}>
                    Alterar senha:
                </Text>

                <Text style={styles.senhainvalida(display)}>
                    {mensagem}
                </Text>

                <TextInput style={styles.textInput}
                    value={oldPassword}
                    placeholder='Senha anterior' onChangeText={text => setOldPassword(text)}
                    secureTextEntry={true}
                />

                <TextInput style={styles.textInput}
                    value={newPassword}
                    placeholder='Nova senha' onChangeText={text => setNewPassword(text)}
                    secureTextEntry={true}
                />

                <TextInput style={styles.textInput}
                    value={checkNewPassword}
                    placeholder='Confirme a nova senha' onChangeText={text => setCheckNewPassword(text)}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={habilitButton ? styles.disabedButton : styles.button} 
                    onPress={() => sendForm()}
                    disabled={habilitButton}>

                    <Text style={styles.textButton}>
                        Confirmar
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    textInput: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        width: '85%',
        color: '#222',
        fontSize: 16,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10
    },
    senhainvalida: (text='none') => ({
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
        display: text
    }),
    button: {
        backgroundColor: '#789ac7',
        width: '85%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    disabedButton: {
        backgroundColor: '#949eab',
        width: '85%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
  })