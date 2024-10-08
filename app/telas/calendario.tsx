import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Task {
    name: string;
    date: string; // ISO string
    time: string; // Formato "HH:mm"
    category: string;
    color: string;
    icon: any; // Ajuste para o tipo correto, se necessário
  }

interface Category {
    name: string;
    icon: any; // Ajuste para o tipo correto, se necessário
    color: string;
}

const ptBR = {
  monthNames: [
    "Janeiro de", "Fevereiro de", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
  monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje"
};

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<DateData | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas para evitar problemas de fuso horário
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  });
  
  const [taskTime, setTaskTime] = useState(new Date()); // Armazena o horário selecionado
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // Adiciona estado para controle do DatePicker
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    { name: 'TREINO', icon: require('../../assets/images/iconesCellbit/TREINO.png'), color: '#5D4EBF' },
    { name: 'ESTUDOS', icon: require('../../assets/images/iconesCellbit/ESTUDOS.png'), color: '#73DCF6' },
    { name: 'BEM-ESTAR', icon: require('../../assets/images/iconesCellbit/BEMESTAR.png'), color: '#FAABDE' },
    { name: 'SOCIAL', icon: require('../../assets/images/iconesCellbit/SOCIAL.png'), color: '#DDDD45' },
    { name: 'TRABALHO', icon: require('../../assets/images/iconesCellbit/TRABALHO.png'), color: '#7A6C5D' },
    { name: 'NUTRIÇÃO', icon: require('../../assets/images/iconesCellbit/NUTRICAO.png'), color: '#F68616' },
    { name: 'CASA', icon: require('../../assets/images/iconesCellbit/CASA.png'), color: '#D9B79A' },
    { name: 'LAZER', icon: require('../../assets/images/iconesCellbit/LAZER.png'), color: '#FFBF49' },
    { name: 'AUTO-CUIDADO', icon: require('../../assets/images/iconesCellbit/AUTOCUIDADO.png'), color: '#BF499E' },
    { name: 'RELIGIÃO', icon: require('../../assets/images/iconesCellbit/IGREJA.png'), color: '#478AA6' },
    { name: 'FAMÍLIA', icon: require('../../assets/images/iconesCellbit/FAMILIA.png'), color: '#DD3232' },
    { name: 'RELAÇÃO', icon: require('../../assets/images/iconesCellbit/RELACAO.png'), color: '#A52A20' },
    { name: 'SAÚDE', icon: require('../../assets/images/iconesCellbit/saude.png'), color: '#ACD980' },
    { name: 'NATUREZA', icon: require('../../assets/images/iconesCellbit/NATUREZA.png'), color: '#65B84C' },
    { name: 'PET', icon: require('../../assets/images/iconesCellbit/PET.png'), color: '#9C664F' },
    { name: 'ESPORTE', icon: require('../../assets/images/iconesCellbit/ESPORTE.png'), color: '#58B1BB' },
    { name: 'FINANCEIRO', icon: require('../../assets/images/iconesCellbit/FINAN.png'), color: '#D5A62D' },
    { name: 'ENTRETENIMENTO', icon: require('../../assets/images/iconesCellbit/ENTRETENIMENTO.png'), color: '#B184C0' },
  ];

  const onDayPress = (day : DateData) => {
    const localDate = new Date(day.dateString);
    setSelectedDay(day);

    // Define a data da tarefa para o dia selecionado + 1 dia
    localDate.setDate(localDate.getDate() + 1); // Adiciona 1 dia
    const isoDate = localDate.toISOString().split('T')[0];
    setTaskDate(isoDate);

    // Verifica se já existe uma tarefa para esse dia
    const existingTaskIndex = tasks.findIndex(task => task.date === isoDate);

    // Se existir, mova a tarefa para o topo
    if (existingTaskIndex !== -1) {
        const taskToMove = tasks[existingTaskIndex];
        const updatedTasks = [...tasks]; // Cria uma cópia do array de tarefas
        updatedTasks.splice(existingTaskIndex, 1); // Remove a tarefa da lista
        updatedTasks.unshift(taskToMove); // Adiciona a tarefa movida para o topo
        setTasks(updatedTasks); // Atualiza a lista de tarefas
    }
};



const addTask = () => {
  // Task name and category validation
  if (!taskName) {
      alert("Por favor, insira o nome da tarefa.");
      return;
  }

  if (!selectedCategory) {
      alert("Por favor, selecione uma categoria.");
      return;
  }


   
  const newTask = {
    name: taskName,
    date: new Date(taskDate + 'T00:00:00').toISOString().split('T')[0], // Sempre garante que é UTC
    time: taskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: selectedCategory.name,
    color: selectedCategory.color,
    icon: selectedCategory.icon,
};


// Checking if the task already exists
const existingTaskIndex = tasks.findIndex(task => task.date === taskDate && task.name === taskName);
if (existingTaskIndex !== -1) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(existingTaskIndex, 1); // Remove the existing task
    setTasks([newTask, ...updatedTasks]); // Add the new task at the top
} else {
    setTasks([newTask, ...tasks]); // Add new task at the top
}

    // Resetando os campos
    setTaskName('');
    // Reset taskDate to the current date in ISO format
    const today = new Date();
    setTaskDate(today.toISOString().split('T')[0]); 
    setSelectedCategory(null);
    setSelectedCategoryIcon(null);
    setModalVisible(false);
};

  // Função para formatar a data
  const formatDate = (dateString : string) => {
    const localDate = new Date(dateString); // Converte a string de data para Date
    return `${localDate.getDate()}/${localDate.getMonth() + 1}/${localDate.getFullYear()}`; // Formato DD/MM/YYYY
};


  // Função para formatar a hora
  const formatTime = (date : Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVENTOS</Text>

      <Calendar
        style={styles.calendar}
        theme={{
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
          textDayFontSize: 18,
          monthTextColor: "#D5A62D",
          todayTextColor: "#F06543", // Cor do dia atual
          selectedDayBackgroundColor: "#D5A62D",
          selectedDayTextColor: "#FFFFFF",
          arrowColor: "#FFFFFF",
          calendarBackground: "transparent",
          dayTextColor: "#FFFFFF",
        }}
        hideExtraDays={true}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDay?.dateString || ""]: {
            selected: true,
            selectedColor: '#D5A62D',
          },
        }}
      />

<ScrollView style={styles.taskList}>
    {tasks.map((task, index) => (
        <TouchableOpacity 
        key={index} 
        style={styles.taskItemContainer} 
        onPress={() => {
            // Aqui você pode abrir um modal para editar a tarefa
            setTaskName(task.name);
            setTaskDate(task.date);
            setTaskTime(new Date(`1970-01-01T${task.time}:00`)); // Setar horário corretamente
            setSelectedCategory({ name: task.category, color: task.color, icon: task.icon });
            // Você pode abrir o modal de edição aqui, se necessário
            // setModalVisible(true);
        }}
    >
    
            <View style={styles.dateBox}>
                <Text style={styles.dateText}>{new Date(task.date).getDate()}</Text>
                <Text style={styles.monthText}>{ptBR.monthNamesShort[new Date(task.date).getMonth()]}</Text>
            </View>
            <View style={[styles.taskItem, { backgroundColor: task.color }]}>
                <Image source={task.icon} style={styles.taskIcon} />
                <Text style={styles.taskName}>{task.name}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
            </View>
        </TouchableOpacity>
    ))}

    {/* Mensagem quando não há tarefas */}
    {tasks.length === 0 && (
        <Text style={styles.noEventsText}>
            Nenhum Evento Programado para hoje
        </Text>
    )}
</ScrollView>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>NOVO EVENTO</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do evento"
              placeholderTextColor="#ccc"
              value={taskName}
              onChangeText={setTaskName}
            />

            <TouchableOpacity 
              style={styles.categoryPicker} 
              onPress={() => setShowCategoryModal(true)}
            >
              <Image 
                source={selectedCategoryIcon || require('../../assets/images/iconesCellbit/nada.png')} 
                style={styles.categoryIcon} 
              />
              <Text style={styles.categoryPickerText}>
                {selectedCategory ? selectedCategory.name : 'Selecione uma categoria'}
              </Text>
            </TouchableOpacity>

            {/* Botão para abrir o DatePicker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
    <Text style={styles.datePickerLabel}>Data:</Text>
    <View style={styles.contai}>
        <Image
            source={require('../../assets/images/iconesCellbit/calendario.png')}
            style={styles.image}
        />
        <Text style={styles.dateTexto}>{formatDate(taskDate)}</Text>
    </View>
</TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>

<Text style={styles.datePickerLabel}>Horário:</Text>
<View style={styles.contai}>
<Image
source={require('../../assets/images/iconesCellbit/hora.png')} // Caminho para a imagem local
style={styles.image}
/>
<Text style={styles.dateTexto}>{formatTime(taskTime)}</Text>
</View>
</TouchableOpacity>

{showTimePicker && (
    <DateTimePicker
        value={taskTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
            if (selectedDate) {
                setTaskTime(selectedDate);
            }
            setShowTimePicker(false); // Fecha o picker após a seleção
        }}
    />
)}


            {/* Exibir DatePicker se showDatePicker for verdadeiro */}
            {showDatePicker && (
    <DateTimePicker
        value={new Date(taskDate)} // Use taskDate as the value
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
            if (selectedDate) {
                const localDate = new Date(selectedDate);
                const isoDate = localDate.toISOString().split('T')[0];
                setTaskDate(isoDate); // Update taskDate to the newly selected date
            }
            setShowDatePicker(false);
        }}
                
              />
            )}

            <TouchableOpacity style={styles.button} onPress={addTask}>
              <Text style={styles.buttonText}>Adicionar Evento</Text>
            </TouchableOpacity>

           
          </View>
        </View>
      </Modal>
{/* Modal para seleção de categoria */}
<Modal
    animationType="slide"
    transparent={true}
    visible={showCategoryModal}
    onRequestClose={() => setShowCategoryModal(false)}
>
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione uma Categoria</Text>

            <ScrollView
                style={styles.scrollContainer} // Adiciona um estilo para o ScrollView
                contentContainerStyle={styles.scrollContent} // Estilo para o conteúdo do ScrollView
                bounces={false} // Desativa o efeito de "bounce" no scroll
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.categoryOption, { backgroundColor: category.color }]} // A cor de fundo continua aqui
                        onPress={() => {
                            setSelectedCategory(category);
                            setSelectedCategoryIcon(category.icon);
                            setShowCategoryModal(false);
                        }}
                    >
                        <Image source={category.icon} style={styles.categoryIcon} />
                        <Text style={styles.categoryPickerText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

  
        </View>
    </View>
</Modal>

      {/* Botão flutuante para adicionar evento */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17272E",
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 50,
    color: "#FFFFFF",
    textAlign: 'left',
  },
  calendar: {
    margin: 10,
    backgroundColor: "transparent",
  },
  taskList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  taskItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flex: 1,
  },
  dateBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    marginRight: 15,
  },
  dateText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 0,
  },
  contai: {
    flexDirection: 'row', // Alinha os itens em linha
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: '#25343A',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  image: {
    width: 30, // Defina a largura desejada
    height: 30, // Defina a altura desejada
    marginRight: 10, // Espaço entre a imagem e o texto
  },
  dateTexto: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
   

  },
  monthText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  taskIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  taskName: {
    fontSize: 18,
    color: "#FFFFFF",
    flex: 1,
  },
  
  taskTime: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  noEventsText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F202680',
    opacity: 50,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#0F2026',
    borderRadius: 10,
    padding: 20,
    
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
    color: '#FFFFFF'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    
  },
  categoryPicker: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  categoryIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  categoryPickerText: {
    color: '#FFFFFF',
  },
  scrollContainer: {
    maxHeight: 300, // Define uma altura máxima para o ScrollView
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 10, // Adiciona um pouco de espaçamento vertical
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5, // Borda arredondada
    marginBottom: 10, // Espaçamento entre as opções
    height: 40, // Altura fixa menor para as opções
    justifyContent: 'flex-start', // Alinhamento do conteúdo
    width: '100%', // Largura fixa
  },



  datePickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#D5A62D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    paddingBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#E7B12C',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

