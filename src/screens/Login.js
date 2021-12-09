import React, {useState, useEffect} from 'react'
import { 
    View, TextInput, Image, StyleSheet, Text, ImageBackground,
    KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import imageBG from '../../assets/img/imageBackground.png'

export default function Login(props) {

    const [display, setDisplay] = useState('none')

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground source={imageBG} style={styles.background}>

                <View>
                    
                    <Image source={require('../../assets/img/logo.png')} style={styles.image} />

                </View>

                <View>

                    <Text style={styles.mensagemAlerta(display)}>Usuárioou senha inválios :(</Text>

                </View>

                <View>
                <TextInput 
                    placeholder='E-mail'
                    autoCorrect={false}
                    onChangeText={() => {}}
                    style={styles.input}
                    />

                <TextInput 
                    placeholder='Senha'
                    secureTextEntry= {true}
                    autoCorrect={false}
                    onChangeText={() => {}}
                    style={styles.input}
                />
                </View>

                <TouchableOpacity style={styles.botaoLogin}>
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
    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 15,
        color: '#222',
        fontSize: 16,
        borderRadius: 10,
        padding: 10
    },
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
    }
  })