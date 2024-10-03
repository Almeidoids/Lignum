import { View, StyleSheet, TextInput, Image, Pressable, Modal, GestureResponderEvent, ImageSourcePropType, ScrollView, LayoutAnimation, Platform, UIManager, KeyboardAvoidingView, NativeSyntheticEvent, NativeTouchEvent, StyleProp, ViewStyle, FlatList } from "react-native"; 
import { useState, useRef, RefObject, forwardRef } from "react";
import styles from "../estilos/sobreposicoes";
import { useFonts } from "expo-font";
import { Text, RadioButton } from "react-native-paper";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker"
import dayjs from "dayjs";

if (Platform.OS == "android" && UIManager.setLayoutAnimationEnabledExperimental) { //diz para o Android aceitar animações do LayoutAnimation
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SobreposicaoNovaTarefa() {

    const [nome, setNome] = useState("")

    const [textoCategorias, setTextoCategorias] = useState("");

    const [prioridade, setPrioridade] = useState(3);

    const [textoData, setTextoData] = useState("");

    const [textoTipo, setTextoTipo] = useState("Sim ou não (Padrão)");

    const [subtarefa, setSubtarefa] = useState(false);

    const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

    const [animacaoDropdown, setAnimacaoDropdown] = useState(false);

    const [chequeData, setchequeData] = useState(false);

    const [chequePendente, setchequePendente] = useState(false);

    const [chequeFrequencia, setchequeFrequencia] = useState("primeiro");

    const [modalPrioridadeVisivel, setModalPrioridadeVisivel] = useState(false);

    const [legendaCategorias, setLegendaCategorias] = useState("Categoria");

    const [imagemCategorias, setImagemCategorias] = useState(require("../../assets/images/icones_Tela_inicial/íconeCategoria2.png"))

    const [numeroPrioridade, setNumeroPrioridade] = useState(3);

    const [dataCalendario, setDataCalendario] = useState(new Date());

    const [Calendariovisivel, setCalendarioVisivel] = useState(false);

    const [legendaCalendario, setLegendaCalendario] = useState("__/__/__");

    const [modalTipoVisivel, setModalTipoVisivel] = useState(false);

    const [posicaoModal, setPosicaoModal] = useState({top: 0, left: 0})

    const abrirRefCategoria = useRef<View>(null)

    const abrirRefPrioridade = useRef<View>(null)

    const abrirRefTipos = useRef<View>(null);

    const abrirRefSubtarefas = useRef<View>(null);

    const [legendaTipos, setLegendaTipos] = useState("Sim ou não (Padrão)")

    const [imagemTipos, setImagemTipos] = useState(require("../../assets/images/icones_Tela_inicial/iconePadrao.png"))

    const [modalSubtarefasVisivel, setModalSubtarefasVisivel] = useState(false);

    const [Fontes] = useFonts({
        "Julius-Sans-One": require("../../assets/fonts/JuliusSansOne-Regular.ttf"),
        "Inter": require("../../assets/fonts/Inter/static/Inter-Regular.ttf"),
        })

    const chamarAnimacao = () => { //Animação de dropdown dos modais
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnimacaoDropdown(!animacaoDropdown);
    };

    const onChange = (event : DateTimePickerEvent, data : Date | undefined) => {
        setLegendaCalendario(dayjs(data).format("DD/MM/YYYY"));
        const dataAtual : Date = data as Date
        setDataCalendario(dataAtual);
        setTextoData(legendaCalendario);
    }

    const mostrarModalCategoria = () => {
        //console.log("")
        abrirRefCategoria.current?.measure((fx : number, fy : number, width : number, height : number, px : number, py: number) => {
            setPosicaoModal({top: py + height, left: px});
            setModalCategoriasVisivel(true);
        })
    };

    const mostrarModalPrioridade = () => {
        //console.log("")
        abrirRefPrioridade.current?.measure((fx : number, fy : number, width : number, height : number, px : number, py: number) => {
            setPosicaoModal({top: py + height, left: px});
            setModalPrioridadeVisivel(true);
        })
    };

    const mostrarModalTipos = () => {
        //console.log("")
        abrirRefTipos.current?.measure((fx : number, fy : number, width : number, height : number, px : number, py: number) => {
            setPosicaoModal({top: py + height, left: px});
            setModalTipoVisivel(true);
        })
    }

    const mostrarModalSubtarefas = () => {
        //console.log("")
        abrirRefSubtarefas.current?.measure((fx : number, fy : number, width : number, height : number, px : number, py: number) => {
            setPosicaoModal({top: py + height, left: px});
            setModalSubtarefasVisivel(true);
        })
    }

    const pegarPropsCategorias = (novaLegenda : string, novaImagem : ImageSourcePropType) => { //Pega as propriedades do modal das categorias e os armazena nas variaveis
        setLegendaCategorias(novaLegenda);
        setImagemCategorias(novaImagem);
        setModalCategoriasVisivel(!modalCategoriasVisivel)

        setTextoCategorias(novaLegenda);
    } //As variaveis que foram alteradas aqui serão utilizadas lá embaixo para alterar o texto e a imagem do botão categorias

    const pegarPropsPrioridades = (novoNumero : number) => {
        setNumeroPrioridade(novoNumero);
        setModalPrioridadeVisivel(!modalPrioridadeVisivel)

        setPrioridade(novoNumero);
    }

    const pegarPropsTipos = (novaLegenda : string, novaImagem : ImageSourcePropType) => {
        setLegendaTipos(novaLegenda);
        setImagemTipos(novaImagem);
        setModalTipoVisivel(!modalTipoVisivel);

        setTextoTipo(novaLegenda);
        
        if (novaLegenda === "Lista de atividades") {
            setSubtarefa(true);
        }

        else {
            setSubtarefa(false);
        }
    }

    const Data = [{
            id: "domingo",
            valor: dayjs().day(0),
            legenda: "D"
        },
        {
            id: "segunda",
            valor: dayjs().day(1),
            legenda: "S"
        },
        {
            id: "terca",
            valor: dayjs().day(2),
            legenda: "T"
        },
        {
            id: "quarta",
            valor: dayjs().day(3),
            legenda: "Q"
        },
        {
            id: "quinta",
            valor: dayjs().day(4),
            legenda: "Q"
        },
        {
            id: "sexta",
            valor: dayjs().day(5),
            legenda: "S"
        },
        {
            id: "sabado",
            valor: dayjs().day(6),
            legenda: "S"
        }
    ]

    return (
        <ScrollView style = {styles.telaFundo}>
            <Text variant = "displaySmall" style = {estiloFontes.displaySmall}>Nova Tarefa</Text>
            <View style = {styles.espacoLetra}>
                <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>Nome da Tarefa</Text>
                <View style = {styles.espacoCaixa}>
                    <TextInput 
                    style = {[styles.caixaTexto, {fontFamily: "Inter"}]}
                    cursorColor={"#fff"}
                    maxLength={41}
                    onChangeText = {setNome}
                    value = {nome}
                    />

                    <Modal
                        visible={modalCategoriasVisivel}
                        transparent = {true}
                        onRequestClose={() => {
                            setModalCategoriasVisivel(!modalCategoriasVisivel);
                        }}>

                        <Pressable onPress={() => {setModalCategoriasVisivel(!modalCategoriasVisivel)}} style = {styles.botao_fecha_modal} />
                        
                            <ModalCategorias aoSelecionar={pegarPropsCategorias} style = {[styles.modalCategorias, {top: posicaoModal.top, left: posicaoModal.left}]} />
                        
                    </Modal>

                    <Botao legenda = {legendaCategorias} acao = {() => {mostrarModalCategoria()}} imagem = {imagemCategorias} ref = {abrirRefCategoria} />

                </View>
            </View>

            <View style = {styles.linhaPDA}>
                
                <View style = {styles.alinhamentoPrioridade}>
                    <Text variant="titleLarge" style = {estiloFontes.TitleLarge}>Prioridade</Text>
                    
                    <Pressable style = {styles.prioridade} onPress = {() => {mostrarModalPrioridade()}} ref = {abrirRefPrioridade}>
                        <Text variant = "displayLarge" style = {estiloFontes.displayLarge}>{numeroPrioridade}</Text>
                    </Pressable>
                
                </View>
                
                <View style = {styles.alinhamentoDataAlvo}>
                    
                    <View style = {styles.textoDataAlvo}>
                        <RadioButton value = "1"
                                    status = {chequeData ? "checked" : "unchecked"}
                                    onPress={() => {setchequeData(!chequeData);
                                                    setLegendaCalendario("__/__/__")}}
                                    color = "#fff"
                        />
                        <Text variant="titleLarge" style = {estiloFontes.TitleLarge}>Data-alvo</Text>
                    </View>

                    <View>
                        <Image source={require("../../assets/images/icones_Tela_inicial/iconeCalendario.png")} style = {styles.iconeCalendario} />
                        <Text 
                        style = {chequeData ? [styles.dataAlvo, {fontFamily: "Julius-Sans-One"}] : [styles.dataAlvo, {fontFamily: "Julius-Sans-One", backgroundColor: "#0F2026"}]}
                        onPress={() => {chequeData ?
                            DateTimePickerAndroid.open({
                                value: dataCalendario,
                                onChange,
                                mode: "date",
                                display: "spinner",
                            })
                            : 
                            {}
                        }}>{legendaCalendario}</Text>
                    </View>
                </View>

            </View>

            <Modal
                visible={modalPrioridadeVisivel}
                transparent = {true}
                onRequestClose={() => {
                    setModalPrioridadeVisivel(!modalPrioridadeVisivel);
            }}>

                <Pressable onPress = {() => setModalPrioridadeVisivel(!modalPrioridadeVisivel)} style = {[styles.botao_fecha_modal, {paddingTop: "107%"}]} />

                <ModalPrioridades aoSelecionar = {pegarPropsPrioridades} style = {[styles.fundoModalPrioridade, {top: posicaoModal.top, left: posicaoModal.left}]} />

            </Modal>
        
            <View style = {styles.alinhamentoTarefaPendente}>
                <RadioButton 
                    value = "2"
                    status = {chequePendente ? "checked" : "unchecked"}
                    onPress={() => {setchequePendente(!chequePendente)}}
                    color = "#fff"
                />
                
                <View style = {styles.espacamentoTarefaPendente}>
                    <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>Tarefa pendente</Text>
                    <Text variant = "labelLarge" style = {estiloFontes.labelLarge}>A tarefa permanecerá até que seja concluida</Text>
                </View>
            </View>

            <View style = {styles.espacoLetra}>
                <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>Descrição</Text>

                <View style = {styles.caixaTextoDescricao}>
                    <TextInput
                        style = {{fontFamily: "Inter", width: "85%", color: "#fff", fontSize: 15}}
                        cursorColor={"#fff"}
                        multiline = {true}
                        maxLength={164}
                    />
                    <Image source = {require("../../assets/images/icones_Tela_inicial/iconeDescricao.png")} style = {styles.iconeDescricao} />
                </View>
            </View>

            <View style = {styles.espacoLetra}>
                <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>Tipo</Text>

                <Modal
                    visible={modalTipoVisivel}
                    transparent = {true}
                    onRequestClose={() => {
                    setModalTipoVisivel(!modalTipoVisivel);
                }}>

                    <Pressable onPress={() => setModalTipoVisivel(!modalTipoVisivel)} style = {[styles.botao_fecha_modal, {flex: 1}]}/>

                    <ModalTipos aoSelecionar={pegarPropsTipos} style = {[styles.fundoModalTipos, {top: posicaoModal.top, left: posicaoModal.left}]} />

                </Modal>

                <View style = {[styles.espacoCaixa, {height: "5%"}]}>
                    <Botao legenda = {legendaTipos} acao = {() => {mostrarModalTipos()}} imagem = {imagemTipos} ref = {abrirRefTipos} />

                    <Modal
                        visible={modalSubtarefasVisivel}
                        transparent = {true}
                        onRequestClose={() => {
                            setModalSubtarefasVisivel(!modalSubtarefasVisivel);
                    }}>
                        <Pressable onPress = {() => setModalSubtarefasVisivel(!modalSubtarefasVisivel)} style = {[styles.botao_fecha_modal, {flex: 1}]} />

                        <ModalSubTarefas tituloModal = {nome} style = {[styles.fundoModalTipos, {top: posicaoModal.top, left: posicaoModal.left}]}/>

                    </Modal>

                    {subtarefa && 
                        <BotaoSubTarefas numero = {0} acao = {() => mostrarModalSubtarefas()} ref = {abrirRefSubtarefas} />
                    }

                </View>

            </View>

            <View style = {styles.espacoLetra}>
                <Text style = {estiloFontes.TitleLarge}>Frequência</Text>
                <Text style = {estiloFontes.labelLarge}>Defina quando a tarefa se repete</Text>
                <RadioButton.Group onValueChange = {novoValor => setchequeFrequencia(novoValor)} value = {chequeFrequencia}>
                        
                    <View style = {styles.alinhamentoModalPrioridade}>
                        <RadioButton value = "primeiro" color = "#fff"/>
                        <Text style = {[estiloFontes.bodySmall, {alignSelf: "center"}]}>Não se repete</Text>
                    </View>

                    <View style = {styles.alinhamentoModalPrioridade}>
                        <RadioButton value = "segundo" color = "#fff"/>
                        <Text style = {[estiloFontes.bodySmall, {alignSelf: "center"}]}>Algumas vezes na semana</Text>
                    </View>

                    <View style = {styles.alinhamentoModalPrioridade}>
                        <RadioButton value = "terceiro" color = "#fff"/>
                        <Text style = {[estiloFontes.bodySmall, {alignSelf: "center"}]}>Algumas vezes no mês</Text>
                    </View>
                </RadioButton.Group>
            </View>

            {chequeFrequencia == "segundo" && 
                <FlatList
                    data = {Data}
                    renderItem = {({item}) => <Semanas legenda = {item.legenda} />}
                    keyExtractor = {item => item.id}
                    horizontal = {true}
                    contentContainerStyle = {{flex: 1, justifyContent: "center"}}
                    style = {{alignSelf: "center"}}
                />
            }

            <View style = {styles.espacoLetra}>
                <Text style = {estiloFontes.TitleLarge}>Lembrete</Text>
                <Text style = {estiloFontes.labelLarge}>Defina um horário de notificação para a tarefa.</Text>
            </View>

            <View style = {{height: 300}} />
        </ScrollView>

    )
}

interface BotaoProps {
    legenda:string;
    acao: (event : GestureResponderEvent) => void;
    imagem : ImageSourcePropType
    //ref : RefObject<View>
}

const Botao = forwardRef<View ,BotaoProps>(({legenda, acao, imagem}, ref) => {
    return(
        <Pressable style = {styles.Categorias} onPress = {acao} ref = {ref}>
                        <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>{legenda}</Text>
                        <Image source = {imagem} style = {styles.imagem} />
                    </Pressable>
    )
})

interface BotaoSubTarefaProps {
    numero : number;
    acao: (event : GestureResponderEvent) => void;
    //ref : RefObject<View>
}

const BotaoSubTarefas = forwardRef<View ,BotaoSubTarefaProps>(({numero, acao}, ref) => {
    return(
        <Pressable style = {styles.Categorias} onPress = {acao} ref = {ref}>

            <View style = {{flexDirection: "row", justifyContent: "space-around"}}>
                <Text variant = "titleLarge" style = {estiloFontes.TitleLarge}>{"SubTarefas"}</Text>
                <Text variant = "titleLarge" style = {[estiloFontes.TitleLarge, styles.textoSubtarefas]}>{numero}</Text>
            </View>

            <Image source = {require("../../assets/images/icones_Tela_inicial/iconeListaAtividades.png")} style = {styles.imagem} />
        </Pressable>
    )
})

interface Selecionar {
    aoSelecionar : (legenda : string,
                imagem: ImageSourcePropType) => void;
    style : StyleProp<ViewStyle>
}

//Aparência do modal de Categorias, a propriedade aoSelecionar pega as propriedades da categoria ao ser apertada e lança para o componente pai
//o componente pai pega esses valores e coloca no Botao de Categorias
export function ModalCategorias({aoSelecionar, style} : Selecionar) {
    return(
        <ScrollView style = {style} contentContainerStyle = {styles.conteudoScrollView}>
            
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

interface OpcoesCategorias {
    legenda:string;
    acao: (event : GestureResponderEvent) => void;
    imagem : ImageSourcePropType
}

//Aparência das categorias dentro do modal
export function OpcoesCategorias({legenda, acao, imagem} : OpcoesCategorias) {
    return (
        <Pressable style = {styles.alinhamentoIcones} onPress = {acao}>
            <Image source = {imagem} style = {styles.imagemCategorias}/>
            <Text variant = "bodySmall" style = {estiloFontes.bodySmall}>{legenda}</Text>
        </Pressable>
)
}

interface SelecionarPrioridade {
    aoSelecionar : (numero : number) => void;
    style: StyleProp<ViewStyle>
}
//Ainda não estilizei.
export function ModalPrioridades( {aoSelecionar, style} : SelecionarPrioridade ) {
    
    return (
        <View style = {style}>

            <ObjetoPrioridade titulo = "Prioridade máxima" legenda = "Tarefa urgente. Inadiavel" numero = {1} acao = {() => {aoSelecionar(1)}} />
            <ObjetoPrioridade titulo = "É prioridade" legenda = "Tarefa importante" numero = {2} acao = {() => {aoSelecionar(2)}} />
            <ObjetoPrioridade titulo = "Prioridade comum" legenda = "Tarefa comum. Prioridade padrão" numero = {3} acao = {() => {aoSelecionar(3)}} />

        </View>
)}

interface BotaoPrioridade {
    titulo : string;
    legenda : string;
    numero : number;
    acao : (event : GestureResponderEvent) => void;
}

export function ObjetoPrioridade({titulo, legenda, numero, acao} : BotaoPrioridade) {
    return(
        <Pressable style = {styles.alinhamentoModalPrioridade} onPress = {acao}>
                    
            <View style = {[styles.prioridade, {height: 56, width: 56, margin: 12,}]}>

                <Text style = {[estiloFontes.displaySmall, {color: "#000"}]}>{numero}</Text>
            
            </View>
            
            <View style = {styles.alinhamentoTextoPrioridade}>

                <Text style = {estiloFontes.TitleLarge}>{titulo}</Text>
                <Text style = {estiloFontes.labelLarge}>{legenda}</Text>

            </View>
        </Pressable>
)}

interface modalTipos {
    aoSelecionar: (titulo: string,
                    imagem: ImageSourcePropType) => void;
    style : StyleProp<ViewStyle>
}

export function ModalTipos({aoSelecionar, style} : modalTipos) {
    return (
        <View style = {style}>
            
            <ObjetoTipos 
                titulo = "Sim ou não (Padrão)" 
                legenda = "Marcar como concluida ou não" 
                imagem  = {require("../../assets/images/icones_Tela_inicial/iconePadrao.png")} 
                acao = {() => {aoSelecionar("Sim ou não (Padrão)", require("../../assets/images/icones_Tela_inicial/iconePadrao.png"))}} />
            
            <ObjetoTipos 
                titulo = "Lista de atividades" 
                legenda = "Listar uma tarefa com subitens" 
                imagem  = {require("../../assets/images/icones_Tela_inicial/iconeListaAtividades.png")} 
                acao = {() => {aoSelecionar("Lista de atividades", require("../../assets/images/icones_Tela_inicial/iconeListaAtividades.png"))}} />

            <ObjetoTipos 
                titulo = "Quantidade" 
                legenda = "Tarefa com meta quantificada" 
                imagem  = {require("../../assets/images/icones_Tela_inicial/iconeQuantidade.png")}
                acao = {() => {aoSelecionar("Quantidade", require("../../assets/images/icones_Tela_inicial/iconeQuantidade.png"))}}/>

        </View>
)}

interface objetoTipos {
    titulo: string;
    legenda: string;
    imagem: ImageSourcePropType;
    acao: (event : GestureResponderEvent) => void;
}

export function ObjetoTipos({titulo, legenda, imagem, acao} : objetoTipos) {
    return(
        <Pressable style = {[styles.alinhamentoModalPrioridade]} onPress = {acao}>

            <View style = {[styles.Tipos]}>
                <Image source = {imagem} style = {styles.imagemCategorias} />
            </View>

            <View style = {styles.alinhamentoTextoPrioridade}>
                <Text style = {estiloFontes.TitleLarge}>{titulo}</Text>
                <Text style = {estiloFontes.labelLarge}>{legenda}</Text>
            </View>
        </Pressable>
    )
}

interface subTarefas {
    tituloModal : string
    style : StyleProp<ViewStyle>;
}

export function ModalSubTarefas({tituloModal, style} : subTarefas) {
    const [data, setData] = useState([{id: "1", title: "Não há subitens"}])

    const [modalAdicionarSubtarefaVisivel, setModalAdicionarSubtarefaVisivel] = useState(false)

    return (
        <View style = {style}>
            
            <View>
                <FlatList
                    data = {data}
                    renderItem={({item}) => <ItemSubtarefa legenda = {item.title} />}
                    keyExtractor={item => item.id}
                />
            </View>

            <Modal
                        visible={modalAdicionarSubtarefaVisivel}
                        transparent = {true}
                        onRequestClose={() => {
                            setModalAdicionarSubtarefaVisivel(!modalAdicionarSubtarefaVisivel);
                    }}>

                    <Pressable onPress = {() => setModalAdicionarSubtarefaVisivel(!modalAdicionarSubtarefaVisivel)} style = {[{flex: 1, backgroundColor: "#0F2026", opacity: 0.5}]} />

                    <View style = {[styles.fundoModalPrioridade, {top: "50%"}]}>
                        <Text style = {[estiloFontes.TitleLarge, {textAlign: "center", padding: "10%"}]}>{tituloModal}</Text>
                        <TextInput 
                            style = {[styles.caixaTexto, {fontFamily: "Inter", alignSelf: "center", width: "90%"}]}
                            cursorColor={"#fff"}
                            maxLength={41}
                        />
                        <Pressable>
                            <Image source = {require("../../assets/images/botoes/botaoProximo.png")} style = {styles.imagemModalAdicionarSubtarefa} />
                        </Pressable>
                    </View>
            
            </Modal>
            
            <Pressable onPress = {() => (setModalAdicionarSubtarefaVisivel(!modalAdicionarSubtarefaVisivel))} style = {[styles.alinhamentoModalPrioridade, {justifyContent: "center", padding: 10,}]}>
                <Image source = {require("../../assets/images/icones_Tela_inicial/iconeMaisVetorizado.png")} style = {styles.imagemCategorias} />
                <Text style = {[estiloFontes.TitleLarge, {alignSelf: "center"}]}>Adicionar subitem</Text>
            </Pressable>
        </View>
    )
};

type legenda = {legenda : string};

export function ItemSubtarefa({legenda} : legenda) {
    return (
        <View style = {[styles.alinhamentoModalPrioridade, {padding: 10}]}>
            <View style = {{backgroundColor: "#D5A62D", height: 10, width: 10, borderRadius: 5, alignSelf: "center"}} />
            <Text style = {[estiloFontes.TitleLarge, {marginLeft: "10%"}]}>{legenda}</Text>
        </View>
    )
}

type Semanas = {legenda : string};

export function Semanas({legenda} : Semanas) {

    const [corFundo, setCorFundo] = useState("#0F2026");
    const [ativado, setAtivado] = useState(false);

    return (
        <Pressable style = {[styles.fundoSemanas, {backgroundColor: corFundo}]} onPress = {() => {
            setAtivado(!ativado);
            ativado ?
            setCorFundo("#D5A62D")
            :
            setCorFundo("#0F2026")
                }
            }>
            <Text style = {[estiloFontes.TitleLarge, {fontFamily: "Inter", padding: "3%"}]}>{legenda}</Text>
        </Pressable>
    )
}

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
    },

    labelLarge: {
        fontSize: 10,
        color: "#fff",
        fontFamily: "Julius-Sans-One"
    }
})