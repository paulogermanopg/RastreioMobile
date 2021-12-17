import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import Header from '../../components/areaUser/Header'
import config from '../../../config/config.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'

export default function Cadastro(props) {

    const address = config.origin
    const [code, setCode] = useState(null)
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        getUserId()
    }, [])

    useEffect(() => {
        randomCode()
        setProduct(null)
    }, [response])

    //capturar o ID do Usiário
    async function getUserId(){
        let response = await AsyncStorage.getItem('userData')
        let json = JSON.parse(response)
        setUser(json.id)
    }

    //geração de código random
    async function randomCode(){
        let stringAleatoria = '';
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 25; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        setCode(stringAleatoria)
    }

    //enviar formulário
    async function sendForm(){
        let response = await fetch(`${config.urlRoot}create`,{
            method: 'POST',
            body: JSON.stringify({
                userId: user,
                code: code,
                product: product,
                local: address
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json()
        setResponse(json)
    }

    //compartilhar QRCode
    async function shareQRCode() {
        const image = config.urlRoot+'img/code.png'
        FileSystem.downloadAsync(
            image,
            FileSystem.documentDirectory+'.png'
        ).then(({uri}) => {
            Sharing.shareAsync(uri)
        })
        
        await Sharing.shareAsync()
    }

    return (
        <View>

            <Header navigation={props.navigation} titulo={'Cadastro'} />

            <View style={styles.container}>

                {response &&
                    <View>

                        <Image source={{uri:response, height: 180, width: 180}} />
                        
                        <Button title='Compartilhar QRCode' onPress={() => shareQRCode()}/>

                    </View>
                }

                <TextInput
                    value={product}
                    placeholder='Nome do produto'
                    onChangeText={text => setProduct(text)}
                />

                <TouchableOpacity style={styles.button}
                    onPress={() => sendForm()}>

                    <Text style={styles.textButton}>
                        Cadastrar
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        backgroundColor: '#789ac7',
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