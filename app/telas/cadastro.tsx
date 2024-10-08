import React, { useState } from 'react';
import {View, Alert, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '@/tipos/navigation';
import { Colors } from '@/constants/Colors';
import {MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-hook-form';

 // P/ criar um botão q volte p/ a tela anterior, "onPress={() => navigation.goBack()}>"...

export default function Cadastro() {

    const navigation = useNavigation<propsStack>()

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [ready, setReady] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const handleCreateUser = async() => {

        if (name == '' || email == '' || pass == '') {

            Alert.alert('Campos Obrigatórios', 'Preencha os Campos');

        }

        else {

            await AsyncStorage.setItem('@asyncStorage:nameUser', name);
            await AsyncStorage.setItem('@asyncStorage:emailUser', email);
            await AsyncStorage.setItem('@asyncStorage:passUser', pass);

            setLoading(true);

            setReady(true);
            setTimeout(() => {

                setReady(false);
                navigation.navigate('Login');

            }, 2500);

            console.log(name, email, pass);

        }
    };

    return (

        <View style = {styles.container}>

            <View style = {styles.lignum}>

                <Animatable.Image delay = {600}

                    animation = "fadeInLeft"
                    source = {require('../../assets/images/iconesIsabelle/lignum.png')}
                    style = {{width: '35%'}}
                    resizeMode = "contain"

                    />

            </View>

            <View style = {styles.cadastro}>

                <Animatable.Image delay = {1000}

                    animation = "fadeInLeft"
                    source = {require('../../assets/images/iconesIsabelle/cadastro.png')}
                    style = {{width: '25%'}}
                    resizeMode = "contain"

                    />

            </View>

            <Animatable.View animation = "fadeInUp" delay = {600} style = {styles.form}>
                
            <View style={styles.bxInput}>

                <TextInput
                
                style = {styles.input}
                placeholder='Nome de Usuário'
                placeholderTextColor = '#92A4AC'
                autoCorrect = {false}
                autoCapitalize = 'none'
                secureTextEntry = {false}
                onChangeText={(t) => setName(t)}

                />
                
                <MaterialIcons
                
                    name = 'person-outline'
                    size = {25}
                    color = {Colors.colors.primary}
                
                />

            </View>

            <View style={styles.bxInput}>

                <TextInput
                
                style = {styles.input}
                placeholder='Email'
                placeholderTextColor = '#92A4AC'
                autoCorrect = {false}
                autoCapitalize = 'none'
                secureTextEntry = {false}
                onChangeText={(t) => setEmail(t)}

                />
                
                <MaterialIcons
                
                    name = 'mail-outline'
                    size = {25}
                    color = {Colors.colors.primary}
                
                />

            </View>

            <View style={styles.bxInput}>

                <TextInput
                
                style = {styles.input}
                placeholder='Senha'
                placeholderTextColor = '#92A4AC'
                autoCorrect = {false}
                autoCapitalize = 'none'
                secureTextEntry = {true}
                onChangeText={(t) => setPass(t)}

                />
                
                <MaterialIcons
                
                    name = 'lock-outline'
                    size = {25}
                    color = {Colors.colors.primary}
                
                />

            </View>

            </Animatable.View>

            <Animatable.View animation = "fadeInUp" delay={1000}>

                <TouchableOpacity style = {styles.button} onPress = {handleCreateUser}>

                    {!loading ? (
                        <Text style = {styles.buttonText}>
                            Acessar
                        </Text>)
                    :
                    (<ActivityIndicator color={'#FFFFFF'} size={20} />)}

                </TouchableOpacity>

            </Animatable.View>

            <Animatable.View animation = "fadeInUp" delay={1000}>

                <TouchableOpacity style = {styles.buttonRegister} onPress={() => navigation.goBack()}>
                    <Text style = {styles.buttonText2}>Faça Login</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>

    );
}

const styles = StyleSheet.create ({

    container: {

        flex: 1,
        backgroundColor: Colors.colors.back2

    },

    lignum: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "10%"

    },

    cadastro: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20

    },

    form: {

        paddingStart: '10%',
        paddingEnd: '10%',
        marginTop: 10

    },

    bxInput: {

        width: '100%',
        height: 40,
        paddingStart: '5%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.colors.gray,
        marginTop: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'

    },

    input: {

        height: '100%',
        width: '85%',
        fontSize: 15,
        color: '#FFFFFF',
        paddingEnd: '5%'

    },

    button: {

        flex: 1,
        position: 'absolute',
        backgroundColor: Colors.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 35,
        alignSelf: 'center',
        width: '50%',
        height: 60,
        marginTop: 50

    },
    
    buttonRegister: {

        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        alignSelf: 'center',
        width: '50%',
        height: 60,
        bottom: -180

    },

    buttonText: {

        fontSize: 25,
        color: '#FFFFFF'

    },

    buttonText2: {

        fontSize: 15,
        color: '#FFFFFF'

    }
})