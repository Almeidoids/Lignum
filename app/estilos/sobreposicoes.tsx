import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";


const styles = StyleSheet.create({
    telaFundo: {
        flex: 1,
        backgroundColor: "#14252C",
        overflow: "scroll",
    },

    espacoLetra: {
        marginTop: "10%",
        marginLeft: "5%",
    },
    
    espacoCaixa: {
        marginTop: "2%",
        justifyContent: "center",
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
        maxHeight: "55%",
        //flex: 1,
        left: "5%",
        right: "5%",
        marginTop: 0,
        paddingLeft: "5%",
        paddingRight: "5%",
        borderRadius: 10,
        position: "absolute"
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
        paddingTop: "70%",
        //backgroundColor: "#fff"
    },

    linhaPDA: {
        marginTop: "8%",
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
        borderRadius: 13,
        color: "#fff",
        textAlign: "center",
        paddingLeft: "5%",
        fontSize: 20,
        verticalAlign: "middle",
    },

    iconeCalendario: {
        position: "absolute",
        height: 30,
        width: 30,
        zIndex: 10,
        top: "35%",
        marginLeft: 5,
    },

    fundoModalPrioridade: {
        backgroundColor: "#0F2026",
        width: "80%",
        left: "10%",
        right: "10%",
        borderRadius: 10,
        zIndex: 10,
        position: "absolute",
    },

    alinhamentoModalPrioridade: {
        flexDirection: "row"
    },

    alinhamentoTextoPrioridade: {
        justifyContent: "center",
    },

    alinhamentoTarefaPendente: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
        width: "95%",
        marginLeft: "5%",
    },

    espacamentoTarefaPendente: {
        marginLeft: "5%"
    },

    caixaTextoDescricao: {
        marginTop: "2%",
        justifyContent: "center",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        height: "auto",
        paddingTop: 5,
        paddingBottom: 5,
        width: "95%",
        fontSize: 15,
        paddingLeft: 8,
        color: "#fff",
        fontFamily: "Inter",
    },

    iconeDescricao: {
        position: "absolute",
        height: 30,
        width: 30,
        alignSelf: "flex-end",
    },

    fundoModalTipos: {
        backgroundColor: "#0F2026",
        width: "90%",
        left: "5%",
        right: "5%",
        borderRadius: 10,
        zIndex: 10,
        position: "absolute",
    },

    Tipos: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        elevation: 50,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: "5%",
        paddingRight: "5%",

    },

    textoSubtarefas: {
        backgroundColor: "#0F2026", 
        color: "#D5A62D", 
        borderRadius: 10, 
        paddingLeft: 5, 
        paddingRight: 5, 
        marginLeft: 5
    },

    imagemModalAdicionarSubtarefa: {
        height: 40,
        width: 40,
        alignSelf: "flex-end",
        marginTop: "10%"
    },

    fundoSemanas: {
        backgroundColor: "#0F2026",
        marginLeft: "2%",
        justifyContent: "center",
        borderRadius: 10,
        },

})

export default styles;