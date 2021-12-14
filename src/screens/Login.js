import React, {useState, useEffect} from 'react'
import { 
    View, Image, StyleSheet, Text, ImageBackground,
    KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform,
    Alert } from 'react-native'
import imageBG from '../../assets/img/imageBackground.png'
import AuthInput from '../components/AuthInput'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

export default function Login(props) {

    const [display, setDisplay] = useState('none')
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [login, setLogin] = useState(false)

    useEffect(() => {
        verifyLogin()
    }, [])

    useEffect(() => {
        if (login === true) {
            biometric()
        }
    }, [login])

    //verificação de login
    async function verifyLogin(){
        let response = await AsyncStorage.getItem('userData')
        let json = await JSON.parse(response)
        
        if (json !== null) {
            setUser(json.name)
            setPassword(json.password)
            setLogin(true)
        }
    }

    //biometria
    async function biometric(){
        let compatible = await LocalAuthentication.hasHardwareAsync()
        if (compatible) {
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            if (!biometricRecords){
                Alert.alert('Sem biometrias no sistema :(', 'ok')
            } else {
                let result = await LocalAuthentication.authenticateAsync()
                if (result.success) {
                    sendForm()
                } else {
                    setUser(null)
                    setPassword(null)
                }
            }
        }
    }


    //enviar dados para o back
    async function sendForm() {
        let response = await fetch('http://192.168.1.4:3000/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        })

        let json = await response.json()
        
        if (json === 'error') {
            setDisplay('flex')
            setTimeout(() => {
                setDisplay('none')
            }, 5000)
            await AsyncStorage.clear()
        } else {
           await AsyncStorage.setItem('userData', JSON.stringify(json))
           props.navigation.navigate('AreaUser')
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground source={imageBG} style={styles.background}>

                <View>
                    
                    <Image source={require('../../assets/img/logo.png')} style={styles.image} />

                </View>

                <View>

                    <Text style={styles.mensagemAlerta(display)}>Usuário ou senha inválidos :(</Text>

                </View>

                <View>

                    <AuthInput icon={faUser} placeholder='Usuário' value={user} 
                        style={styles.input} keyboardType='email-address'
                        onChangeText={text => setUser(text)} />

                    <AuthInput icon={faLock} 
                        placeholder='Senha' value={password} 
                        style={styles.input} 
                        onChangeText={text => setPassword(text)}  
                        secureTextEntry={true} />
                    
                </View>

                <TouchableOpacity style={styles.botaoLogin} onPress={()=>sendForm()}>
                    <Text style={styles.loginText}>
                        Faça Login!
                    </Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.botaoRegistrar}>
                    <Text style={styles.registrarText}>
                        Seja Loginner!
                    </Text>
                </TouchableOpacity>

            </ImageBackground>   

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    mensagemAlerta: (text='none') => ({
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red',
        marginVertical: 15,
        display: text,
    }),
    botaoLogin: {
        backgroundColor: '#789ac7',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    botaoRegistrar: {
        marginTop: 10
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    registrarText: {
        color: '#000'
    },
  })