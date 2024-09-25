import { Text, View, StyleSheet } from "react-native";

export default function Comunidade() {
    return(
        <View style = {styles.corFundo}>
            <Text style = {styles.texto}>Pode escrever seu código (deixei as telas de cores diferentes só para diferenciar)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    corFundo: {
        backgroundColor: "red",
        flex: 1,
        justifyContent: "center"
    },
    texto: {
        fontSize: 20,
        textAlign: "center",
        color: "#fff"
    }
})