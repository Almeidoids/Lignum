import { createNativeStackNavigator } from "@react-navigation/native-stack"; //npx expo install @react-navigation/native; npx expo install react-native-screens react-native-safe-area-context
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View } from "react-native";
import { propsNavigationStack } from "@/tipos/navigation";
import Index from "./index";
import Cronograma from "./telas/cronograma";
import Login from "./telas/login";
import Cadastro from "./telas/cadastro";
import Home from "./telas/calendario";
import Menu from "./telas/menu";
import Welcome from "./telas/welcome";
import Time from "./telas/timer";

  const Tab = createBottomTabNavigator(); //Cria o componente do menu

export default function RootLayout() {
  /*
  O Tab.Navigator é o menu de fato, já os Tab.Screen são as opções e quem chamam as telas
  Note que o primeiro Tab.Screen chama a função TelaInicial, não o componente da tela Index em si
  Isso também acontece com os outros Tab.Screen
  */
  return (
      <Tab.Navigator screenOptions={{headerShown: false, 
                                    tabBarStyle: {backgroundColor: "#0F2026", borderTopWidth: 0},}}>

        <Tab.Screen name = "index" component = {TelaInicial} options={{title: "", tabBarIcon: ({focused, color, size}) => {          
          let verdadeiro //Este código só faz a bolinha aparecer embaixo das opções
          
          if (verdadeiro = focused) {
              return(
              <View>
                <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaInicial.png")} style = {styles.imagem} />
                <View style = {styles.circulo}></View>
              </View>)
          }
          else {
            return(
            <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaInicial.png")} style = {styles.imagem}/>
          )}
        }}} />
        


        <Tab.Screen name = "telas/cronograma" component={TelaCronograma} options={{title: "", tabBarIcon: ({focused, color, size}) => {
          let verdadeiro
            
          if (verdadeiro = focused) {
              return(
              <View>
                <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaCronograma.png")} style = {styles.imagem} />
                <View style = {styles.circulo}></View>
              </View>)
          }
          else {
            return(
              <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaCronograma.png")} style = {styles.imagem}/>
            )
          }
        }}} />



        <Tab.Screen name = "telas/welcome" component={TelaComunidade} options={{title: "", tabBarIcon: ({focused, color, size}) => {
          let verdadeiro
            
          if (verdadeiro = focused) {
              return(
              <View>
                <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaComunidade.png")} style = {styles.imagem} />
                <View style = {styles.circulo}></View>
              </View>)
          }
          else {
            return(
              <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaComunidade.png")} style = {styles.imagem}/>
            )
          }
        }}} />



        <Tab.Screen name = "telas/calendario" component={TelaCalendario} options={{title: "", tabBarIcon: ({focused, color, size}) => {
          let verdadeiro
            
          if (verdadeiro = focused) {
              return(
              <View>
                <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaCalendario.png")} style = {styles.imagem} />
                <View style = {styles.circulo}></View>
              </View>)
          }
          else {
            return(
              <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaCalendario.png")} style = {styles.imagem}/>
            )
          }
        }}} />



        <Tab.Screen name = "telas/menu" component={TelaMenu} options={{title: "", tabBarIcon: ({focused, color, size}) => {
            let verdadeiro
              
            if (verdadeiro = focused) {
                return(
                <View>
                  <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaMenu.png")} style = {styles.imagem} />
                  <View style = {styles.circulo}></View>
                </View>)
            }
            else {
            return(
              <Image source = {require("../assets/images/icones_Tela_inicial/íconeTelaMenu.png")} style = {styles.imagem}/>
            )
          }
        }}} />



      </Tab.Navigator>
  );
}

//const StackInicial = createNativeStackNavigator();
const Stack = createNativeStackNavigator(); //é aquele espaço branco que aparecia em cima da tela, utilizamos ele para navegar pelas páginas que não estão no menu

//Função da tela Inicial.
//Você coloca o componente principal da tela Index nesta função, junto com os componentes das telas ligadas a tela Inicial, mas que não estão no menu
//ao usar esta função, você diz que a tela inicial aceitará navegar para outros componentes que não estão listados no Tab.Navigator, mas para isso, você tem que listá-los aqui
//A mesma coisa vale para as outras funções das outras telas
export function TelaInicial() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false, navigationBarHidden: true, statusBarTranslucent: true}}>
      <Stack.Screen name = "Index" component = {Index} />
    </Stack.Navigator>
  )
}

//const StackCronograma = createNativeStackNavigator();

export function TelaCronograma() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false, navigationBarHidden: true, statusBarTranslucent: true}}>
      <Stack.Screen name = "Cronograma" component = {Cronograma} />
    </Stack.Navigator>
  )
}

//const StackComunidade = createNativeStackNavigator();

export function TelaComunidade() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false, navigationBarHidden: true, statusBarTranslucent: true}}>
      <Stack.Screen name = "Welcome" component = {Welcome} />
      <Stack.Screen name = "Cadastro" component = {Cadastro} />
      <Stack.Screen name = "Login" component = {Login} />
    </Stack.Navigator>
  )
}

//const StackCalendario = createNativeStackNavigator();

export function TelaCalendario() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false, navigationBarHidden: true, statusBarTranslucent: true}}>
      <Stack.Screen name = "Calendario" component = {Home}/>
    </Stack.Navigator>
  )
}

//const StackMenu = createNativeStackNavigator();

export function TelaMenu() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false, navigationBarHidden: true, statusBarTranslucent: true}}>
      <Stack.Screen name = "Menu" component = {Menu} />
      <Stack.Screen name = "Timer" component = {Time} />
      <Stack.Screen name = "Calendario" component = {Home} />
      <Stack.Screen name = "Login" component = {Login} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  imagem: {
    height: 30,
    width: 30,
  },

  circulo: {
    height: 5,
    width: 5, 
    borderRadius: 5/2, 
    backgroundColor: "#87E1F8", 
    alignSelf: "center",
    top: 1
  },
})