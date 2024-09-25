//Favor ver toda a parte de _layout.tsx e entender como ele funciona antes de colocar alguma tela no código...
import { View, StyleSheet, Pressable, GestureResponderEvent, Image, Modal, ImageSourcePropType } from "react-native";
import { useFonts } from "expo-font"; //npx expo install expo-font (biblioteca usada para importar as fontes)
import dayjs from "dayjs"; //npx expo install dayjs (biblioteca usada para manipular o tempo)
import * as Progress from "react-native-progress" //npx expo install react-native-progress (Biblioteca da barra de progresso)
import { useState } from "react";
import { Text } from "react-native-paper" //npx expo install react-native-paper; npx expo install react-native-safe-area-context; npx expo install react-native-vector-icons
import SobreposicaoNovaTarefa from "./modais/sobreposicaoNovaTarefa";
import { SplashScreen } from "expo-router";

//Esta seção fala a familia de fonte que estamos importando, e já importa a fonte para o código
export default function Index() { 
  const [FontesCarregadas] = useFonts({ //Essa variavel faz a importação com as fontes
    "Julius-Sans-One": require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    "Inter": require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
  })

  if (!FontesCarregadas) { //Código feito para carregar uma tela de carregamento enquanto as fontes estão sendo carregadas... Acho que não funciona, mas deixei aqui mesmo assim
    SplashScreen.hideAsync();
  }

  const [dias, setDias] = useState(dayjs()); //variavel que tem o valor do dia atual
  
  const [numeros, setNumeros] = useState(1);
  
  const [textoDias, setTextoDias] = useState(dias.format("DD/MM")); //varíavel que aparece na tela do app, faz a formatação da data para dia/mes (essa formatação já é convertida em string)

  //Seção super dificil de explicar, se possivel não mexer, somente caso necessário. Faz o controle da data
  const atualizarDias = (incremento : number) => {
    setDias(controleDia => {
     const NovoDia = controleDia.add(incremento, "day");
     setTextoDias(NovoDia.format("DD/MM"));
     return NovoDia
    });
    setNumeros(controleNumeros => controleNumeros + incremento)
   }

   const [modalVisivel, setModalVisivel] = useState(false);
   const [sobreposicaoVisivel, setSobreposicaoVisivel] = useState(false);

   //a partir do return, começa a parte mais de design, as views formam a cor de fundo, o card, e assim vai...
  return (
    <View style = {{backgroundColor: "#25343A", flex: 1, }}>  
      <View style = {styles.linha1}>
        <Botao legenda = {"<"} acao = {() => {
          if (numeros > 1) {
            atualizarDias(-1) //Chama atualizarDias para fazer o controle de data, faz o número do dia diminuir em um...
          }
        }} />
        <View style = {styles.data}>
          <Text variant="headlineLarge" style = {[styles.headlineLarge]}>{textoDias}</Text>
        </View>
        <Botao legenda = {">"} acao = {() => { //Chama a funcao botao como componente e suas propriedades
          if (numeros < 7) {
            atualizarDias(1) //faz o número de dias aumentar em um
          }
        }} />
        
        <View style = {styles.tarefas}>
          <Text variant = "titleLarge" style = {[styles.titleLarge]}>Tarefas</Text>
          <Text variant = "bodySmall" style = {[styles.bodySmall, { color: "#fff" }]}>0/10 Tarefas</Text>
          <Progress.Bar progress= {0.5} width = {100} color = "#5D4EBF" unfilledColor = "#DEEFF1" />
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisivel}
          transparent = {true}
          onRequestClose={() => {
            setModalVisivel(!modalVisivel);
          }}>
          <View style = {styles.fundo_modal}>
            <Modos imagem = {require("../assets/images/icones_Tela_inicial/iconeHabito.png")} titulo = "Hábito" descricao = "Ação que se repete monitorada e relatada" acao = {() => {console.log("Hábito")}}/>
            <Modos imagem = {require("../assets/images/icones_Tela_inicial/iconeMeta.png")} titulo = "Meta" descricao = "Especificação de um objetivo. Monitorada" acao = {() => {console.log("Meta")}}/>
            <Modos imagem = {require("../assets/images/icones_Tela_inicial/iconeTarefa.png")} titulo = "Tarefa" descricao = "Atividade de instância única" acao = {() => {
              setSobreposicaoVisivel(!sobreposicaoVisivel)
            }}/>
            <Modos imagem = {require("../assets/images/icones_Tela_inicial/iconeTarefaRecorrente.png")} titulo = "Tarefa recorrente" descricao = "Atividade que se repete ao longo do tempo" acao = {() => {console.log("Tarefa recorrente")}}/>
          </View>
        </Modal>
        
        
        
        <Pressable style = {styles.botao_mais} onPress={() => {
        setModalVisivel(!modalVisivel) //Botão usado para deixar o modal visivel ou invisivel
        }}>
        <Image source={require("../assets/images/botoes/botaoMais.png")} style={{ height: 60, width: 60 }} />
      </Pressable>
      </View>


      <View>
        <Modal
          animationType="slide"
          visible={sobreposicaoVisivel}
          transparent = {true}
          style = {{backgroundColor: "#14252C"}}
          onRequestClose={() => {
            setSobreposicaoVisivel(!sobreposicaoVisivel);
          }}>

            <SobreposicaoNovaTarefa />

        </Modal>
      </View>
    </View>
  );
}

//propriedade que vai ser utilizada na tipagem do botao, coisa chata do typescript
interface BotaoProps {
  legenda:string;
  acao: (event : GestureResponderEvent) => void; //diz que acao será de um tipo que será ativado como evento ao pressionar o botão
}

//Funcao dos dois Botaos "<" e ">"
export function Botao({legenda, acao} : BotaoProps) { 
  return (
    <Pressable onPress = {acao}>
      <Text style = {[styles.setas, { color: "#fff" }]}>{legenda}</Text>
    </Pressable>
  );
}

interface AdicionarProps {
  imagem : ImageSourcePropType; //diz que o tipo vai ser... Imagem
  titulo : string;
  descricao : string; 
  acao: (event : GestureResponderEvent) => void
}

export function Modos({imagem, titulo, descricao, acao} : AdicionarProps) {
  return (
            <Pressable onPress={acao}>
              <View style = {styles.organizacao_modal}>
                <Image source={imagem} style = {styles.imagem_modal}/>
                <View>
                  <Text variant = "titleLarge" style = {[styles.titleLarge, {paddingLeft: "5%", fontFamily: "Julius-Sans-One"}]}>{titulo}</Text>
                  <Text variant = "labelLarge" style = {styles.labelLarge}>{descricao}</Text>
                </View>
              </View>
            </Pressable>
  )
}

//Esta função é o design do Card de tarefa, obviamente ele ainda não está aparecendo na tela... Será aplicado em uma atualização futura
export function Cards({}) {
      return (
        <View>
        <View style = {styles.card_tarefas}>
          <Image source = {require("../assets/images/icones_Tela_inicial/iconeEstudos.png")} style = {{marginTop: "02%"}} />
          <View style = {styles.coluna_card_tarefas}>
            <Text variant = "headlineSmall" style = {[styles.headlineSmall]}>Tarefa</Text>
            <Text variant = "titleLarge" style = {[styles.titleLarge, {marginTop: "-15%", marginLeft: "10%"}]}>1<Image source = {require("../assets/images/icones_Tela_inicial/iconePrioridade.png")} /></Text>
          </View>
          <Image source = {require("../assets/images/botoes/radioButtonFalse.png")} style = {{height: "30%", width: "10%", marginLeft: "auto", alignSelf: "center"}} /> 
        </View>
      </View>
      );
}

const styles = StyleSheet.create({
  linha1: {
    flexDirection: "row",   
    marginTop: "20%",
    margin: "auto",
    marginBottom: 0
  },

  setas: {
    fontSize: 50,
    margin: "auto",
    paddingLeft: "02%",
    paddingRight: "2%",
  },

  data: {
    backgroundColor: "#0F2026",
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: "center",
  },

  headlineLarge: {
    fontSize: 30,
    fontFamily: "Julius-Sans-One",
    textAlign: "center",
    color: "#fff"
  },

  tarefas: {
    backgroundColor: "#0F2026",
    height: 100,
    width: 150,
    borderRadius: 15,
    alignItems: "center",
  },

  titleLarge: {
    paddingTop: "05%",
    fontFamily: "Inter",
    color: "#fff",
    fontSize: 20,
  },

  labelLarge: {
    fontFamily: "Julius-Sans-One",
    color: "#fff",
    fontSize: 10,
    paddingLeft: "5%",

  },

  bodySmall: {
    fontFamily: "Inter",
    fontSize: 12,
    paddingTop: "05%",
    paddingBottom: "05%",
    color: "#fff"
  },

  card_tarefas: {
    backgroundColor: "#73DCF6",
    marginTop: "15%",
    height: "30%",
    width: "90%",
    paddingLeft: 10,
    marginLeft: "05%",
    flexDirection: "row",
    borderRadius: 20,
  },

  coluna_card_tarefas: {
    flexDirection: "column", 
    justifyContent: "center"
  },

  headlineSmall: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Julius-Sans-One",
    marginLeft: "5%",
  },

  texto_card_prioridade: {
    marginTop: "-10%",
    marginLeft: "10%",
  },

  botao_mais: {
    position: "absolute",
    left: "80%",
    marginTop: "120%"
  },

  fundo_modal: {
    height: "45%",
    marginTop: "auto",
    backgroundColor: "#0F2026",
  },

  organizacao_modal: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: "90%",
    margin: "auto",
    borderBottomColor: "#fff",
  },

  imagem_modal: {
    marginTop: "5%",
    height: 30,
    width: 30,
    alignSelf: "center"
  }
})