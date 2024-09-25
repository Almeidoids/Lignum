import { View, StyleSheet, TextInput, Image, Pressable, Modal, GestureResponderEvent, ImageSourcePropType, ScrollView, LayoutAnimation, Platform, UIManager } from "react-native"; 
import { useState } from "react";
import styles from "../estilos/sobreposicoes";
import { useFonts } from "expo-font";
import { Text, RadioButton } from "react-native-paper";

if (Platform.OS == "android" && UIManager.setLayoutAnimationEnabledExperimental) { //diz para o Android aceitar animações do LayoutAnimation
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SobreposicaoNovaTarefa() {

    const [textoCategorias, setTextoCategorias] = useState("");

    const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

    const [animacaoDropdown, setAnimacaoDropdown] = useState(false);

    const [cheque, setCheque] = useState(false);

    const [modalPrioridadeVisivel, setModalPrioridadeVisivel] = useState(false);

    const [legendaCategorias, setLegendaCategorias] = useState("Categoria");

    const [imagemCategorias, setImagemCategorias] = useState(require("../../assets/images/icones_Tela_inicial/íconeCategoria2.png"))



    const [Fontes] = useFonts({
        "Julius-Sans-One": require("../../assets/fonts/JuliusSansOne-Regular.ttf"),
        "Inter": require("../../assets/fonts/Inter/static/Inter-Regular.ttf"),
        })

    const chamarAnimacao = () => { //Animação de dropdown dos modais
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnimacaoDropdown(!animacaoDropdown);
    };


    const pegarPropsCategorias = (novaLegenda : string, novaImagem : ImageSourcePropType) => { //Pega as propriedades do modal das categorias e os armazena nas variaveis
        setLegendaCategorias(novaLegenda);
        setImagemCategorias(novaImagem);
        setModalCategoriasVisivel(!modalCategoriasVisivel)

        setTextoCategorias(legendaCategorias);
    } //As variaveis que foram alteradas aqui serão utilizadas lá embaixo para alterar o texto e a imagem do botão categorias

    return (
        <View style = {styles.telaFundo}>
            <Text variant = "displaySmall" style = {estiloFontes.displaySmall}>Nova Tarefa</Text>
            <View style = {styles.espacoLetra}>
                <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>Nome da Tarefa</Text>
                <View style = {styles.espacoCaixa}>
                    <TextInput 
                    style = {[styles.caixaTexto, {fontFamily: "Inter"}]}
                    cursorColor={"#fff"}
                    />

                    <Modal
                        visible={modalCategoriasVisivel}
                        transparent = {true}
                        onRequestClose={() => {
                            setModalCategoriasVisivel(!modalCategoriasVisivel);
                        }}>

                        <Pressable onPress={() => {setModalCategoriasVisivel(!modalCategoriasVisivel)}} style = {styles.botao_fecha_modal} />
                        
                            <ModalCategorias aoSelecionar={pegarPropsCategorias} />
                        
                    </Modal>

                    <BotaoCategorias legenda = {legendaCategorias} acao = {() => {(setModalCategoriasVisivel(!modalCategoriasVisivel)); chamarAnimacao}} imagem = {imagemCategorias} />

                </View>
            </View>

            <View style = {styles.linhaPDA}>
                
                <View style = {styles.alinhamentoPrioridade}>
                    <Text variant="titleLarge" style = {estiloFontes.TitleLarge}>Prioridade</Text>
                    
                    <Pressable style = {styles.prioridade} onPress = {() => {setModalPrioridadeVisivel(!modalPrioridadeVisivel)}}>
                        <Text variant = "displayLarge" style = {estiloFontes.displayLarge}>3</Text>
                    </Pressable>
                
                </View>
                
                <View style = {styles.alinhamentoDataAlvo}>
                    
                    <View style = {styles.textoDataAlvo}>
                        <RadioButton value = "1"
                        status = {cheque ? "checked" : "unchecked"}
                        onPress={() => (setCheque(!cheque))}
                        color = "#fff"
                        
                        />
                        <Text variant="titleLarge" style = {estiloFontes.TitleLarge}>Data-alvo</Text>
                    </View>

                    <View> 
                        <TextInput
                        cursorColor={"#fff"}
                        style = {styles.dataAlvo}
                        editable = {false}
                        inlineImageLeft = "iconecalendario"
                        inlineImagePadding={20}
                        defaultValue = "__/__/__"
                        />
                    </View>
                
                </View>

            </View>

            <Modal
                visible={modalPrioridadeVisivel}
                transparent = {true}
                onRequestClose={() => {
                    setModalPrioridadeVisivel(!modalPrioridadeVisivel);
            }}>

                <ModalPrioridades />

            </Modal>
        
        </View>

    )
}

interface BotaoProps {
    legenda:string;
    acao: (event : GestureResponderEvent) => void;
    imagem : ImageSourcePropType
}

//Aparência do Botão de Categorias
export function BotaoCategorias({legenda, acao, imagem} : BotaoProps) {
    return(
        <Pressable style = {styles.Categorias} onPress = {acao}>
                        <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>{legenda}</Text>
                        <Image source = {imagem} style = {styles.imagem} />
                    </Pressable>
    )
}

interface Selecionar {
    aoSelecionar : (legenda : string,
                imagem: ImageSourcePropType) => void
}

//Aparência do modal de Categorias, a propriedade aoSelecionar pega as propriedades da categoria ao ser apertada e lança para o componente pai
//o componente pai pega esses valores e coloca no Botao de Categorias
export function ModalCategorias({aoSelecionar} : Selecionar) {
    return(
        <ScrollView style = {styles.modalCategorias} contentContainerStyle = {styles.conteudoScrollView}>
            
            <View style = {styles.colunaCategorias}>
                <OpcoesCategorias 
                    legenda = "Treino" 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeTreino.png")} 
                    acao = {() => (aoSelecionar("treino", require("../../assets/images/icones_Tela_inicial/iconeTreino.png")))}/>

                <OpcoesCategorias 
                    legenda = "Social" 
                    acao = {() => (aoSelecionar("Social", require("../../assets/images/icones_Tela_inicial/iconeSocial.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeSocial.png")}/>

                <OpcoesCategorias 
                    legenda = "Nutrição" 
                    acao = {() => (aoSelecionar("Nutrição", require("../../assets/images/icones_Tela_inicial/iconeNutricao.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeNutricao.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Cuidados" 
                    acao = {() => (aoSelecionar("Cuidados", require("../../assets/images/icones_Tela_inicial/iconeAutoCuidado.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeAutoCuidado.png")}/>

                <OpcoesCategorias 
                    legenda = "Animais" 
                    acao = {() => (aoSelecionar("Animais", require("../../assets/images/icones_Tela_inicial/iconeAnimais.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeAnimais.png")}/>

                <OpcoesCategorias 
                    legenda = "Estudos" 
                    acao = {() => (aoSelecionar("Estudos", require("../../assets/images/icones_Tela_inicial/iconeEstudos.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeEstudos.png")}/>

                <OpcoesCategorias 
                    legenda = "Trabalho" 
                    acao = {() => (aoSelecionar("Trabalho", require("../../assets/images/icones_Tela_inicial/iconeTrabalho.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeTrabalho.png")}/>

                <OpcoesCategorias 
                    legenda = "Casa" 
                    acao = {() => (aoSelecionar("Casa", require("../../assets/images/icones_Tela_inicial/iconeCasa.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeCasa.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Religião" 
                    acao = {() => (aoSelecionar("Religião", require("../../assets/images/icones_Tela_inicial/iconeReligiao.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeReligiao.png")}/>

                <OpcoesCategorias 
                    legenda = "Esportes" 
                    acao = {() => (aoSelecionar("Esportes", require("../../assets/images/icones_Tela_inicial/iconeEsportes.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeEsportes.png")}/>

                <OpcoesCategorias 
                    legenda = "Saúde" 
                    acao = {() => (aoSelecionar("Saúde", require("../../assets/images/icones_Tela_inicial/iconeSaude.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeSaude.png")}/>

                <OpcoesCategorias 
                    legenda = "Relação" 
                    acao = {() => (aoSelecionar("Relação", require("../../assets/images/icones_Tela_inicial/iconeRelacionamento.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeRelacionamento.png")}/>

                <OpcoesCategorias 
                    legenda = "Lazer" 
                    acao = {() => (aoSelecionar("Lazer", require("../../assets/images/icones_Tela_inicial/iconeLazer.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeLazer.png")}/>

                <OpcoesCategorias 
                    legenda = "Natureza" 
                    acao = {() => (aoSelecionar("Natureza", require("../../assets/images/icones_Tela_inicial/iconeNatureza.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeNatureza.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Financeiro" 
                    acao = {() => (aoSelecionar("Financeiro", require("../../assets/images/icones_Tela_inicial/iconeFinanceiro.png")))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeFinanceiro.png")}/>
            </View>

        </ScrollView>
    )
}

//Aparência das categorias dentro do modal
export function OpcoesCategorias({legenda, acao, imagem} : BotaoProps) {
    return (
        <Pressable style = {styles.alinhamentoIcones} onPress = {acao}>
            <Image source = {imagem} style = {styles.imagemCategorias}/>
            <Text variant = "bodySmall" style = {estiloFontes.bodySmall}>{legenda}</Text>
        </Pressable>
)
}

//Ainda não estilizei.
export function ModalPrioridades() {
    
    return (
        <View>

            <View>

                <Text>1</Text>
                <View>

                    <Text>Prioridade máxima</Text>
                    <Text>Tarefa urgente. Inadiável</Text>

                </View>
            </View>

        </View>
)}

const estiloFontes = StyleSheet.create({
    displaySmall: {
        fontSize: 32,
        color: "#fff",
        textAlign: "center",
        marginTop: "10%",
        fontFamily: "Julius-Sans-One"
    },

    TitleLarge: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "Julius-Sans-One"
    },

    bodySmall: {
        fontSize: 12,
        color: "#fff",
        fontFamily: "Julius-Sans-One"
    },

    displayLarge: {
        fontSize: 44,
        fontFamily: "Julius-Sans-One"
    }
})