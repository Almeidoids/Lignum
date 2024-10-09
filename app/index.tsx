//Favor ver toda a parte de _layout.tsx e entender como ele funciona antes de colocar alguma tela no código...
import { View, StyleSheet, Pressable, GestureResponderEvent, Image, Modal, ImageSourcePropType, FlatList } from "react-native";
import { useFonts } from "expo-font"; //npx expo install expo-font (biblioteca usada para importar as fontes)
import dayjs, { Dayjs } from "dayjs"; //npx expo install dayjs (biblioteca usada para manipular o tempo)
import * as Progress from "react-native-progress" //npx expo install react-native-progress (Biblioteca da barra de progresso)
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Text, RadioButton } from "react-native-paper" //npx expo install react-native-paper; npx expo install react-native-safe-area-context; npx expo install react-native-vector-icons
import SobreposicaoNovaTarefa from "./modais/sobreposicaoNovaTarefa";
import { SplashScreen } from "expo-router";
import { requestPermissionsAsync, setNotificationHandler, scheduleNotificationAsync, DailyTriggerInput } from "expo-notifications";
import asyncStorage from "@react-native-async-storage/async-storage"

interface Informacoes {
  id : string;
  nome : string;
  categoria : string; 
  backgroundCategoria : string;
  imagemCard : ImageSourcePropType | undefined; 
  prioridade : number; 
  data : string;
  pendente : boolean;
  descricao : string;
  Horario : string
  status : boolean
  horarioCriado : Dayjs
}
//Esta seção fala a familia de fonte que estamos importando, e já importa a fonte para o código
export default function Index() { 
  const [dias, setDias] = useState(dayjs()); //variavel que tem o valor do dia atual
  
  const [numeros, setNumeros] = useState(1);
  
  const [textoDias, setTextoDias] = useState(dias.format("DD/MM")); //varíavel que aparece na tela do app, faz a formatação da data para dia/mes (essa formatação já é convertida em string)

  const [semana, setSemana] = useState<string[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  
  const [sobreposicaoVisivel, setSobreposicaoVisivel] = useState(false);
  
  const [status, setStatus] = useState(false);

   const [dataDomingo, setDataDomingo] = useState<Informacoes[]>([]);
   
   const [dataSegunda, setDataSegunda] = useState<Informacoes[]>([]);
   
   const [dataTerca, setDataTerca] = useState<Informacoes[]>([]);
   
   const [dataQuarta, setDataQuarta] = useState<Informacoes[]>([]);
   
   const [dataQuinta, setDataQuinta] = useState<Informacoes[]>([]);
   
   const [dataSexta, setDataSexta] = useState<Informacoes[]>([]);
   
   const [dataSabado, setDataSabado] = useState<Informacoes[]>([]);

   const [progresso, setProgresso] = useState(0);

   const [totalProgresso, setTotalProgresso] = useState(0);

   const [resultadoProgresso, setResultadoProgresso] = useState(0)
  const [FontesCarregadas] = useFonts({ //Essa variavel faz a importação com as fontes
    "Julius-Sans-One": require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    "Inter": require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
  })

  if (!FontesCarregadas) { //Código feito para carregar uma tela de carregamento enquanto as fontes estão sendo carregadas... Acho que não funciona, mas deixei aqui mesmo assim
    
    SplashScreen.hideAsync();
  }

  const armazenar = (chave : string, valor : Informacoes[]) => {
    const listaString = JSON.stringify(valor)
    asyncStorage.setItem(chave, listaString);
  }

  const buscar = async (chave : string) => {
    try {
      const valor = await asyncStorage.getItem(chave);
      if (valor !== null) {
        const resultado = JSON.parse(valor)
        if (chave === "0") {
          setDataDomingo(resultado);
        }

        else if (chave === "1") {
          setDataSegunda(resultado);
        }

        else if (chave === "2") {
          setDataTerca(resultado);
        }

        else if (chave === "3") {
          setDataQuarta(resultado);
        }

        else if (chave === "4") {
          setDataQuinta(resultado);
        }

        else if (chave === "5") {
          setDataSexta(resultado);
        }

        else if (chave === "6") {
          setDataSabado(resultado);
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    buscar("0");
    buscar("1");
    buscar("2");
    buscar("3");
    buscar("4");
    buscar("5");
    buscar("6");
  }, [])

  useEffect(() => {
    armazenar("0", dataDomingo)
    armazenar("1", dataSegunda)
    armazenar("2", dataTerca)
    armazenar("3", dataQuarta)
    armazenar("4", dataQuinta)
    armazenar("5", dataSexta)
    armazenar("6", dataSabado)

    switch (dayjs().day()) {
      case 0:
        setProgresso(dataDomingo.filter(item => item.status).length)
        setTotalProgresso(dataDomingo.length)
        setResultadoProgresso(dataDomingo.filter(item => item.status).length * 100 / dataDomingo.length / 100)
        break;
      case 1:
        setProgresso(dataSegunda.filter(item => item.status).length)
        setTotalProgresso(dataSegunda.length)
        setResultadoProgresso(dataSegunda.filter(item => item.status).length * 100 / dataSegunda.length / 100)
        break;
      
      case 2:
        setProgresso(dataTerca.filter(item => item.status).length)
        setTotalProgresso(dataTerca.length)
        setResultadoProgresso(dataTerca.filter(item => item.status).length * 100 / dataTerca.length / 100)
        break;

      case 3:
        setProgresso(dataQuarta.filter(item => item.status).length)
        setTotalProgresso(dataQuarta.length)
        setResultadoProgresso(dataQuarta.filter(item => item.status).length * 100 / dataQuarta.length / 100)
        break;

      case 4:
        setProgresso(dataQuinta.filter(item => item.status).length)
        setTotalProgresso(dataQuinta.length)
        setResultadoProgresso(dataQuinta.filter(item => item.status).length * 100 / dataQuinta.length / 100)
        break;

      case 5:
        setProgresso(dataSexta.filter(item => item.status).length)
        setTotalProgresso(dataSexta.length)
        setResultadoProgresso(dataSexta.filter(item => item.status).length * 100 / dataSexta.length / 100)
        break;

      case 6:
        setProgresso(dataSabado.filter(item => item.status).length)
        setTotalProgresso(dataSabado.length)
        setResultadoProgresso(dataSabado.filter(item => item.status).length * 100 / dataSabado.length / 100)
        break;
    }
  }, [dataDomingo, dataSegunda, dataTerca, dataQuarta, dataQuinta, dataSexta])
  //Seção super dificil de explicar, se possivel não mexer, somente caso necessário. Faz o controle da data
  const atualizarDias = (incremento : number) => {
    setDias(controleDia => {
     const NovoDia = controleDia.add(incremento, "day");
     setTextoDias(NovoDia.format("DD/MM"));
     return NovoDia
    });
    setNumeros(controleNumeros => controleNumeros + incremento)
   }
  useEffect(() => {
    const tempoLimite = 1;
    
    const intervalo = setInterval(() => {
      setDataSegunda(valorAntigo => {
        const novaData = valorAntigo.filter(item => {
          if (item.pendente === false) {
            if(item.Horario === "") {
              return dayjs().diff(item.horarioCriado, "day") < tempoLimite;
            }
          }
          return true;
        });
        return novaData;
      })
    }, 3600000)
    return () => clearInterval(intervalo);
  }, [])

  async function mandarNotificacaoDiaria() {
    const {status} = await requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permissões para enviar notificações negada");
    }
    else {
      setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldSetBadge: true,
          shouldPlaySound: false
        })
      })

      scheduleNotificationAsync({
        content: {
          title: "O dia começou...",
          body: "Vamos tomar café e realizar nossas tarefas.",
        },
        trigger: {hour: 10, minute: 0o0, repeats: true}
      })

      scheduleNotificationAsync({
        content: {
          title: "Metade do dia já se foi",
          body: "Já realizou todas suas tarefas?",
        },
        trigger: {hour: 16, minute: 0o0, repeats: true}
      })

      scheduleNotificationAsync({
        content: {
          title: "Hora de dormir",
          body: "Nada melhor do que uma boa noite de sono",
        },
        trigger: {hour: 20, minute: 0o0, repeats: true}
      })
    }
  }

   const pegarPropsSobreposicao = (novoNome : string, novaCategoria : string, novoBackgroundCategoria : string, novaImagemCard : ImageSourcePropType | undefined, novaPrioridade : number, 
                                  novaData : string, NovoPendente : boolean, novaDescricao : string, novaSemana : string[], novoHorario : string, horarioCriado : Dayjs) => {
        let numAleatorio = Math.random() * 1000
        
        setSemana(novaSemana);

        /*console.log(novoNome);
        console.log(novaCategoria);
        console.log(novoBackgroundCategoria);
        console.log(novaImagemCard);
        console.log(novaPrioridade);
        console.log(novaData);
        */console.log(NovoPendente);
        /*console.log(novaDescricao);
        console.log(novaSemana);
        console.log(novoHorario);
  */
        const NovoItem : Informacoes = {
          id : numAleatorio.toString(),
          nome: novoNome,
          categoria: novaCategoria,
          backgroundCategoria: novoBackgroundCategoria,
          data: novaData,
          descricao: novaDescricao,
          Horario: novoHorario,
          imagemCard: novaImagemCard,
          pendente: NovoPendente,
          prioridade: novaPrioridade,
          status : status,
          horarioCriado : horarioCriado
        };

        setSobreposicaoVisivel(false);

        if (novaSemana.length >= 1) {
          novaSemana.forEach(function(valor) {
            console.log(valor);
            if (valor === "domingo") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(0);
              setDataDomingo((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }

            else if (valor === "segunda") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(1);
              setDataSegunda((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }

            else if (valor === "terca") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(2);
              setDataTerca((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }
            
            else if (valor === "quarta") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(3);
              setDataQuarta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }

            else if (valor === "quinta") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(4);
              setDataQuinta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }

            else if (valor === "sexta") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(5);
              setDataSexta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }

            else if (valor === "sabado") {
              NovoItem.horarioCriado = NovoItem.horarioCriado.day(6);
              setDataSabado((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            }                                      
          })
        }

        else {
          if (dias.day() === 0) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(0);
            setDataDomingo((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
            console.log(dataDomingo);
          }

          if (dias.day() === 1) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(1);
            setDataSegunda((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }

          if (dias.day() === 2) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(2);
            setDataTerca((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }

          if (dias.day() === 3) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(3);
            setDataQuarta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }

          if (dias.day() === 4) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(4);
            setDataQuinta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }

          if (dias.day() === 5) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(5);
            setDataSexta((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }

          if (dias.day() === 6) {
            NovoItem.horarioCriado = NovoItem.horarioCriado.day(6);
            setDataSabado((valorAntigo) => {
              let valor = [...valorAntigo, NovoItem];
              valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                      ...valor.filter(item => item.status),];
              return valor;
            })
          }
        }
      }

  const atualizar = (id: string) => {
    if (dias.day() == 0) {
      setDataDomingo(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }

    if (dias.day() == 1) {
      setDataSegunda(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }

    if (dias.day() == 2) {
      setDataTerca(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }
    if (dias.day() == 3) {
      setDataQuarta(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }

    if (dias.day() == 4) {
      setDataQuinta(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }

    if (dias.day() == 5) {
      setDataSexta(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }

    if (dias.day() == 0) { 
      setDataSabado(dataAnterior => {
        const itensAtualizados = dataAnterior.map( item =>
          item.id === id ? {...item, status: !item.status} : item
        );
        
        const itemSelecionado = itensAtualizados.find(item => item.id === id && item.status === true);

        if (itemSelecionado) {
        const novaData = itensAtualizados.filter(item => item.id !== id);
        return [...novaData, itemSelecionado];
        }
        
        else {
          return itensAtualizados;
        }
      })
    }
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = dayjs();
      if (agora.get("hour") === 21 && agora.get("minute") === 56) {
        verificar();
      }
    }, 3600000)

    return () => clearInterval(intervalo)
  }, [])

  const verificar = () => {
    const moverItem = (fonte : Informacoes[], setFonte : Dispatch<SetStateAction<Informacoes[]>>, alvo : Informacoes[], setAlvo : Dispatch<SetStateAction<Informacoes[]>>) => {
      const itensParaMover = fonte.filter(item => item.pendente);

      if (itensParaMover.length > 0) {
        setFonte(fonte.filter(item => !item.pendente));

        setAlvo((valorAntigo) => {
          let valor = [...valorAntigo, ...itensParaMover];
          valor = [...valor.filter(item => !item.status).sort((a, b) => a.prioridade - b.prioridade),
                  ...valor.filter(item => item.status),];
          return valor;
        }/*[...alvo, ...itensParaMover]*/);
      }
    }
    if (dayjs().day() === 0) {
      moverItem(dataDomingo, setDataDomingo, dataSegunda, setDataSegunda);
    }

    else if (dayjs().day() === 1) {
      moverItem(dataSegunda, setDataSegunda, dataTerca, setDataTerca);
    }

    else if (dayjs().day() === 2) {
      moverItem(dataTerca, setDataTerca, dataQuarta, setDataQuarta);
    }

    else if (dayjs().day() === 3) {
      moverItem(dataQuarta, setDataQuarta, dataQuinta, setDataQuinta);
    }

    else if (dayjs().day() === 4) {
      moverItem(dataQuinta, setDataQuinta, dataSexta, setDataSexta);
    }

    else if (dayjs().day() === 5) {
      moverItem(dataSexta, setDataSexta, dataSabado, setDataSabado);
    }

    else if (dayjs().day() === 6) {
      moverItem(dataSabado, setDataSabado, dataDomingo, setDataDomingo);
    }
  }

  mandarNotificacaoDiaria();

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
          <Text variant = "bodySmall" style = {[styles.bodySmall, { color: "#fff" }]}>{progresso}/{totalProgresso} Tarefas</Text>
          <Progress.Bar progress = {resultadoProgresso} width = {100} color = "#5D4EBF" unfilledColor = "#DEEFF1" />
        </View>
      </View>

      <View style = {{flex: 1,}}>
        {dias.day() === 0 &&
          <FlatList
          data = {dataDomingo}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataDomingo}
          />
        //}
        }
        { dias.day() === 1 &&
          <FlatList
          data = {dataSegunda}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataSegunda}
          />
        }

        { dias.day() === 2 &&
          <FlatList
          data = {dataTerca}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataTerca}
          />
        }

        { dias.day() === 3 &&
          <FlatList
          data = {dataQuarta}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataQuarta}
          />
        }

        { dias.day() === 4 &&
          <FlatList
          data = {dataQuinta}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataQuinta}
          />
        }

        { dias.day() === 5 &&
          <FlatList
          data = {dataSexta}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataSexta}
          />
        }

        { dias.day() === 6 &&
          <FlatList
          data = {dataSabado}
          ListEmptyComponent={<Text style = {[styles.titleLarge, {textAlign: "center", verticalAlign: "middle"}]}>Você ainda não colocou nenhuma tarefa</Text>}
          renderItem={({item}) => <Cards item = {item} atualizar = {atualizar}/>} 
          keyExtractor = {(item) => item.id}
          contentContainerStyle = {styles.lista}
          style = {{marginTop: "10%"}}
          extraData={dataSabado}
          />
        }
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
      </View>
        
      <Pressable style = {styles.botao_mais} onPress={() => {
        setModalVisivel(!modalVisivel) //Botão usado para deixar o modal visivel ou invisivel
        }}>
        <Image source={require("../assets/images/botoes/botaoMais.png")} style={{ height: 60, width: 60 }} />
      </Pressable>
    


      <View>
        <Modal
          animationType="slide"
          visible={sobreposicaoVisivel}
          transparent = {true}
          style = {{backgroundColor: "#14252C"}}
          onRequestClose={() => {
            setSobreposicaoVisivel(!sobreposicaoVisivel);
          }}>

            <SobreposicaoNovaTarefa aoSelecionar = {pegarPropsSobreposicao} modalVisivel = {sobreposicaoVisivel} />

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
export function Cards({item, atualizar} : {item : Informacoes, atualizar : (id : string) => void})  {  
  useEffect(() => {
    if (item.Horario !== "") {
      notificacoesAgendadas(item.Horario, item.nome, item.horarioCriado)
    }
  }, []);
  return (
    <View>

      <View style = {[styles.card_tarefas, {backgroundColor: item.backgroundCategoria}]}>
        <Image source = {item.imagemCard} style = {{height: 40, width: 40}} />
        
        <View style = {styles.coluna_card_tarefas}>
          <Text style = {[styles.headlineSmall]}>{item.nome}</Text>

          <View style = {{flexDirection: "row", alignItems: "center"}}>
          <Text style = {[styles.titleLarge, {paddingTop: 0}]}>{item.Horario}</Text>
          <Text style = {[styles.titleLarge, {paddingTop: 0, paddingLeft: 10}]}>{item.prioridade}</Text>
          <Image source = {require("../assets/images/icones_Tela_inicial/iconePrioridade.png")} style = {{height: 20, width: 20}} />
          </View>
        </View>
        
        <View style = {{marginLeft: "auto"}}>
          <RadioButton 
            value = "primeiro"
            status = {item.status ? "checked" : "unchecked"}
            color = "#fff"
            onPress={() => {atualizar(item.id)}}
          /> 
        </View>
    </View>
  </View>
  );
}

async function notificacoesAgendadas(horario : string, nome : string, data : Dayjs) {
  const textoHorarioNotificacao = horario.split(":");
  console.log(textoHorarioNotificacao)
  data = data.set("hour", Number(textoHorarioNotificacao[0])).set("minute", Number(textoHorarioNotificacao[1]));
  console.log(data.toDate().valueOf());
  scheduleNotificationAsync({
    content: {
      title: "Hora de realizar sua tarefa",
      body: nome,
    },
    trigger: {date: data.toDate().valueOf()}
  })
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

  lista: {
    paddingBottom: "10%",
  },

  card_tarefas: {
    //position: "absolute",
    height: 60,
    marginBottom: 20,    
    width: "90%",
    paddingLeft: 10,
    marginLeft: "05%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },

  coluna_card_tarefas: {
    flexDirection: "column", 
    justifyContent: "center",
    marginLeft: "5%",
  },

  headlineSmall: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Julius-Sans-One",
  },

  texto_card_prioridade: {
    marginTop: "-10%",
    marginLeft: "10%",
  },

  botao_mais: {
    flex: 1,
    position: "absolute",
    left: "80%",
    top: "90%",
    zIndex: 10,
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
  },

})