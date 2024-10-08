import { View, StyleSheet, TextInput, Image, Pressable, Modal, GestureResponderEvent, ImageSourcePropType, ScrollView, LayoutAnimation, Platform, UIManager, KeyboardAvoidingView, NativeSyntheticEvent, NativeTouchEvent, StyleProp, ViewStyle, FlatList } from "react-native"; 
import { useState, useRef, RefObject, forwardRef } from "react";
import styles from "../estilos/sobreposicoes";
import { useFonts } from "expo-font";
import { Text, RadioButton } from "react-native-paper";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs, { Dayjs } from "dayjs";
import { imagens } from "@/constants/imagens";

if (Platform.OS == "android" && UIManager.setLayoutAnimationEnabledExperimental) { //diz para o Android aceitar animações do LayoutAnimation
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface Informacoes {
    aoSelecionar : (nome : string,
                    textoCategorias : string,
                    backgroundCategorias : string,
                    imagemCard : ImageSourcePropType | undefined,
                    prioridade : number,
                    textoData : string,
                    chequePendente : boolean,
                    descricao : string,
                    textoSemana : string[],
                    horario : string,
                    horarioCriado : Dayjs) => void;
    modalVisivel : boolean
}
export default function SobreposicaoNovaTarefa({aoSelecionar, modalVisivel} : Informacoes) {

    const [nome, setNome] = useState("")

    const [textoCategorias, setTextoCategorias] = useState("");

    const [backgroundCategorias, setBackgroundCategorias] = useState("");

    const [imagemCard, setImagemCard] = useState<ImageSourcePropType | undefined>()

    const [prioridade, setPrioridade] = useState(3);

    const [textoData, setTextoData] = useState("");

    const [chequePendente, setchequePendente] = useState(false);

    const [descricao, setDescricao] = useState("");

    const [textoTipo, setTextoTipo] = useState("Sim ou não (Padrão)");

    const [textoSemana, setTextoSemana] = useState<string[]>([]);

    const [subtarefa, setSubtarefa] = useState(false);

    const [horario, setHorario] = useState("")

    const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

    const [animacaoDropdown, setAnimacaoDropdown] = useState(false);

    const [chequeData, setchequeData] = useState(false);

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

    const [legendaHorario, setLegendaHorario] = useState("  :  ")

    const [horarioCalendario, setHorarioCalendario] = useState(new Date())

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

        setTextoData(dayjs(data).format("DD/MM/YYYY"));
    }

    const onChangeHorario = (event : DateTimePickerEvent, hora : Date | undefined) => {
        setLegendaHorario(dayjs(hora).format("HH:mm"));
        const horarioAtual : Date = hora as Date
        setHorarioCalendario(horarioAtual);

        setHorario(dayjs(hora).format("HH:mm"));
        console.log(horario);
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

    const pegarPropsCategorias = (novaLegenda : string, novaImagem : ImageSourcePropType, corFundo : string) => { //Pega as propriedades do modal das categorias e os armazena nas variaveis
        setLegendaCategorias(novaLegenda);
        setImagemCategorias(novaImagem);
        setModalCategoriasVisivel(!modalCategoriasVisivel)

        setTextoCategorias(novaLegenda);
        setBackgroundCategorias(corFundo);
        
        if (imagens.treino.nomeImagem === novaLegenda) {
            setImagemCard(imagens.treino.uri);
        }
        
        else if (imagens.social.nomeImagem == novaLegenda) {
            setImagemCard(imagens.social.uri);
        }

        else if (imagens.nutricao.nomeImagem == novaLegenda) {
            setImagemCard(imagens.nutricao.uri);
        }

        else if (imagens.cuidados.nomeImagem == novaLegenda) {
            setImagemCard(imagens.cuidados.uri);
        }

        else if (imagens.animais.nomeImagem == novaLegenda) {
            setImagemCard(imagens.animais.uri);
        }

        else if (imagens.bemEstar.nomeImagem == novaLegenda) {
            setImagemCard(imagens.bemEstar.uri);
        }

        else if (imagens.estudos.nomeImagem == novaLegenda) {
            setImagemCard(imagens.estudos.uri);
        }

        else if (imagens.trabalho.nomeImagem == novaLegenda) {
            setImagemCard(imagens.trabalho.uri);
        }

        else if (imagens.casa.nomeImagem == novaLegenda) {
            setImagemCard(imagens.casa.uri);
        }

        else if (imagens.religiao.nomeImagem == novaLegenda) {
            setImagemCard(imagens.religiao.uri);
        }

        else if (imagens.esportes.nomeImagem == novaLegenda) {
            setImagemCard(imagens.esportes.uri);
        }

        else if (imagens.familia.nomeImagem == novaLegenda) {
            setImagemCard(imagens.familia.uri);
        }

        else if (imagens.saude.nomeImagem == novaLegenda) {
            setImagemCard(imagens.saude.uri);
        }

        else if (imagens.relacao.nomeImagem == novaLegenda) {
            setImagemCard(imagens.relacao.uri);
        }

        else if (imagens.lazer.nomeImagem == novaLegenda) {
            setImagemCard(imagens.lazer.uri);
        }

        else if (imagens.natureza.nomeImagem == novaLegenda) {
            setImagemCard(imagens.natureza.uri);
        }

        else if (imagens.financeiro.nomeImagem == novaLegenda) {
            setImagemCard(imagens.financeiro.uri);
        }

        else if (imagens.outros.nomeImagem == novaLegenda) {
            setImagemCard(imagens.outros.uri);
        }
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

    const pegarPropsSemana = (novaLegenda : string) => {
        setTextoSemana((valorAnterior) => [...valorAnterior, novaLegenda]);
        
        textoSemana.forEach(function(valor, n) {
            if (novaLegenda.includes(valor) === true) {
                setTextoSemana((valorAnterior) => {
                    return valorAnterior.filter(item => item !== valor)
                });
            }
        })
        }

    const Data = [
        { id: "domingo", legenda: "D" },
        { id: "segunda", legenda: "S" },
        { id: "terca", legenda: "T"   },
        { id: "quarta", legenda: "Q"  },
        { id: "quinta", legenda: "Q"  },
        { id: "sexta", legenda: "S"   },
        { id: "sabado", legenda: "S"  }
    ]

    const Clique = () => {

        if (nome === "" || textoCategorias === "") {
            alert("Insira os dados corretamente");
        }

        else {
            aoSelecionar(nome, textoCategorias, backgroundCategorias, imagemCard, prioridade, 
                    textoData, chequePendente, descricao, textoSemana, horario, dayjs())
            
            modalVisivel = true;
        }
    }
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
                        onChangeText = {setDescricao}
                        value = {descricao}
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
                    renderItem = {({item}) => <Semanas legenda = {item.legenda} aoSelecionar={pegarPropsSemana} id = {item.id} />}
                    keyExtractor = {item => item.id}
                    horizontal = {true}
                    contentContainerStyle = {{flex: 1, justifyContent: "center"}}
                    style = {{alignSelf: "center"}}
                />
            }
            <View style = {styles.espacoLetra}>
                <Text style = {estiloFontes.TitleLarge}>Lembrete</Text>
                <Text style = {estiloFontes.labelLarge}>Defina um horário de notificação para a tarefa.</Text>

                <View style = {styles.espacoCaixa}>
                    <View style = {{alignSelf: "center"}}>
                        <Image source={require("../../assets/images/icones_Tela_inicial/iconeLembrete.png")} style = {styles.iconeCalendario} />
                        <Text 
                        style = {[styles.dataAlvo, {fontFamily: "Julius-Sans-One", fontSize: 25}]}
                        onPress={() => {
                            DateTimePickerAndroid.open({
                                value: horarioCalendario,
                                onChange: (onChangeHorario),
                                mode: "time",
                                display: "spinner",
                            })
                        }}>{legendaHorario}</Text>
                    </View>
                </View>
            </View>
            <Pressable style = {styles.botao_voltar} onPress = {() => (Clique())}>
                <Image source = {require("../../assets/images/botoes/botaoProximo.png")} style = {{height: 60, width: 60}}/>
            </Pressable>

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
                imagem: ImageSourcePropType,
                backgroundColor: string) => void;
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
                    acao = {() => (aoSelecionar("Treino", require("../../assets/images/icones_Tela_inicial/iconeTreino.png"), "#5D4EBF"))}/>

                <OpcoesCategorias 
                    legenda = "Social" 
                    acao = {() => (aoSelecionar("Social", require("../../assets/images/icones_Tela_inicial/iconeSocial.png"), "#DDDD45"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeSocial.png")}/>

                <OpcoesCategorias 
                    legenda = "Nutrição" 
                    acao = {() => (aoSelecionar("Nutrição", require("../../assets/images/icones_Tela_inicial/iconeNutricao.png"), "#F68616"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeNutricao.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Cuidados" 
                    acao = {() => (aoSelecionar("Cuidados", require("../../assets/images/icones_Tela_inicial/iconeAutoCuidado.png"), "#BF499E"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeAutoCuidado.png")}/>

                <OpcoesCategorias 
                    legenda = "Animais" 
                    acao = {() => (aoSelecionar("Animais", require("../../assets/images/icones_Tela_inicial/iconeAnimais.png"), "#9C664F"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeAnimais.png")}/>

                <OpcoesCategorias 
                    legenda = "Bem-estar" 
                    acao = {() => (aoSelecionar("Bem-estar", require("../../assets/images/icones_Tela_inicial/iconeBemEstar.png"), "#FAABDE"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeBemEstar.png")}/>

                <OpcoesCategorias 
                    legenda = "Estudos" 
                    acao = {() => (aoSelecionar("Estudos", require("../../assets/images/icones_Tela_inicial/iconeEstudos.png"), "#73DCF6"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeEstudos.png")}/>

                <OpcoesCategorias 
                    legenda = "Trabalho" 
                    acao = {() => (aoSelecionar("Trabalho", require("../../assets/images/icones_Tela_inicial/iconeTrabalho.png"), "#7A6C5D"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeTrabalho.png")}/>

                <OpcoesCategorias 
                    legenda = "Casa" 
                    acao = {() => (aoSelecionar("Casa", require("../../assets/images/icones_Tela_inicial/iconeCasa.png"), "#D9B79A"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeCasa.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Religião" 
                    acao = {() => (aoSelecionar("Religião", require("../../assets/images/icones_Tela_inicial/iconeReligiao.png"), "#478AA6"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeReligiao.png")}/>

                <OpcoesCategorias 
                    legenda = "Esportes" 
                    acao = {() => (aoSelecionar("Esportes", require("../../assets/images/icones_Tela_inicial/iconeEsportes.png"), "#58B1BB"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeEsportes.png")}/>

                <OpcoesCategorias 
                    legenda = "Familia" 
                    acao = {() => (aoSelecionar("Familia", require("../../assets/images/icones_Tela_inicial/iconeFamilia.png"), "#DD3232"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeFamilia.png")}/>

                <OpcoesCategorias 
                    legenda = "Saúde" 
                    acao = {() => (aoSelecionar("Saúde", require("../../assets/images/icones_Tela_inicial/iconeSaude.png"), "#ACD980"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeSaude.png")}/>

                <OpcoesCategorias 
                    legenda = "Relação" 
                    acao = {() => (aoSelecionar("Relação", require("../../assets/images/icones_Tela_inicial/iconeRelacionamento.png"), "#A52A20"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeRelacionamento.png")}/>

                <OpcoesCategorias 
                    legenda = "Lazer" 
                    acao = {() => (aoSelecionar("Lazer", require("../../assets/images/icones_Tela_inicial/iconeLazer.png"), "#FFBF49"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeLazer.png")}/>

                <OpcoesCategorias 
                    legenda = "Natureza" 
                    acao = {() => (aoSelecionar("Natureza", require("../../assets/images/icones_Tela_inicial/iconeNatureza.png"), "#65B84C"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeNatureza.png")}/>
                
                <OpcoesCategorias 
                    legenda = "Financeiro" 
                    acao = {() => (aoSelecionar("Financeiro", require("../../assets/images/icones_Tela_inicial/iconeFinanceiro.png"), "#D5A62D"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeFinanceiro.png")}/>

                <OpcoesCategorias 
                    legenda = "Outros" 
                    acao = {() => (aoSelecionar("Outros", require("../../assets/images/icones_Tela_inicial/iconeOutros.png"), "#B184C0"))} 
                    imagem = {require("../../assets/images/icones_Tela_inicial/iconeOutros.png")}/>
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
                    
            <View style = {[styles.prioridade, {height: 50, width: 50, margin: 12,}]}>

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

interface Semanas {
    legenda : string
    aoSelecionar : (id : string) => void
    id : string
};

export function Semanas({legenda, aoSelecionar, id} : Semanas) {

    const [ativado, setAtivado] = useState(false);

    const pegarValores = () => {
        aoSelecionar(id);
    }

    return (
        <Pressable style = {[styles.fundoSemanas, {backgroundColor: ativado ? "#D5A62D" : "#0F2026"}]} onPress = {() => {
            setAtivado((valorAntigo) => !valorAntigo);
            
            pegarValores();
            }}>
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