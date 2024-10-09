import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../tipos/navigation';
import { Colors } from '../../constants/Colors';

export default function Welcome() {

    const navigation = useNavigation<propsStack>();

    return (

        <View style = {styles.container}>

            <View style = {styles.space}></View>

            <View style = {styles.fraselignum}>

                <Image
                        source = {require('../../assets/images/iconesIsabelle/frEfeito_lignum.png')}
                        style = {{width: '80%'}}
                        resizeMode = "contain"
                    />
               
            </View>

            <View style = {styles.logo}>

                <Image
                    source = {require('../../assets/images/iconesIsabelle/logo_lignum.png')}
                    style = {{width: '60%'}}
                    resizeMode = "contain"
                />

            </View>

            <View style = {styles.lignum}>

                <Animatable.Image
                    animation = "flipInY"
                    source = {require('../../assets/images/iconesIsabelle/lignum.png')}
                    style = {{width: '50%'}}
                    resizeMode = "contain"
                />

            </View>

            <View style = {styles.space}>
            </View>

            <Animatable.View delay = {600} animation = "fadeInUp">
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Index')}>

                <Text style = {styles.buttonText}>Começar</Text>

            </TouchableOpacity>
            </Animatable.View>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: Colors.colors.back,

    },

    space: {

        flex: 0.32

    },

    fraselignum: {

        height: 60,
        justifyContent: 'center',
        alignItems: 'center'

    },

    logo: {

        marginTop: 20,
        marginBottom: 0,
        height: 320,
        justifyContent: 'center',
        alignItems: 'center'

    },

    lignum: {

        height: 80,
        marginTop: -30,
        justifyContent: 'center',
        alignItems: 'center'

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
        bottom: '5%'

    },

    buttonText: {

        fontSize: 25,
        color: '#FFFFFF'

    }

})