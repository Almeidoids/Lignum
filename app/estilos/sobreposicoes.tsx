import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";


const styles = StyleSheet.create({
    telaFundo: {
        flex: 1,
        backgroundColor: "#14252C",
    },

    espacoLetra: {
        marginTop: "10%",
        marginLeft: "5%",
    },
    
    espacoCaixa: {
        marginTop: "2%",
    },

    caixaTexto: {
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        width: "95%",
        fontSize: 15,
        paddingLeft: 8,
        color: "#fff"
    },

    Categorias: {
        backgroundColor: "#25343A",
        height: 40,
        width: "95%",
        justifyContent: "space-between",
        borderColor: "#fff",
        borderWidth: 1,
        marginTop: "5%",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10
    },

    imagem: {
        height: 30,
        width: 30,
        alignSelf: "center",
        marginRight: 5,
    },

    modalCategorias: {
        backgroundColor: "#0F2026",
        width: "90%",
        maxHeight: "50%",
        //flex: 1,
        margin: "auto",
        marginTop: 0,
        paddingLeft: "5%",
        paddingRight: "5%",
        borderRadius: 10,

    },

    colunaCategorias: {
        flexWrap: "wrap",
        marginTop: "5%",
        rowGap: 50,
        flex: 1,

    },

    alinhamentoIcones: {
        alignItems: "center",
        height: "10%",
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-between"
    },

    imagemCategorias: {
        height: 30,
        width: 30,
    },

    conteudoScrollView: {
        maxHeight: "130%",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    botao_fecha_modal: {
        height: "05%",
        width: "95%", 
        paddingTop: "70%"
    },

    linhaPDA: {
        marginTop: 30,
        flexDirection: "row",
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-between",
        alignItems: "flex-start"
        
    },

    alinhamentoPrioridade: {
        alignItems: "center",
    },

    prioridade: {
        backgroundColor: "#D5A62D",
        height: 70,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        elevation: 50,
        borderRadius: 10,
        marginTop: 5,
    },

    alinhamentoDataAlvo: {
        alignItems: "center",
    },

    textoDataAlvo: {
        flexDirection: "row",
        alignItems: "center",
        margin: "auto",
        height: 30,
        
    },

    dataAlvo: {
        marginTop: 5,
        height: 65,
        width: 170,
        backgroundColor: "#25343A",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 13
    }

})

export default styles;