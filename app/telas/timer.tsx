import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';


const Time: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'timer' | 'cronometer' | 'sequence'>('timer');

  return (
    <View style={styles.container}>
      {/* Button group */}
      <View style={styles.fixedButtonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Timer"
            onPress={() => setActiveFeature('timer')}
            color={activeFeature === 'timer' ? '#17272E' : '#0F2026'}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Cronômetro"
            onPress={() => setActiveFeature('cronometer')}
            color={activeFeature === 'cronometer' ? '#17272E' : '#0F2026'}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Sequência"
            onPress={() => setActiveFeature('sequence')}
            color={activeFeature === 'sequence' ? '#17272E' : '#0F2026'}
          />
        </View>
      </View>

      {/* Render active feature screen */}
      <View style={styles.screenContainer}>
        {activeFeature === 'timer' && <TimerScreen />}
        {activeFeature === 'cronometer' && <CronometerScreen />}
        {activeFeature === 'sequence' && <SequenceScreen />}
      </View>
    </View>
  );
};









//TIMER SCREEN
const TimerScreen: React.FC = () => {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const toggleTimer = () => {
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    
    if (totalSeconds > 0) {
      if (isPaused) {
       
        if (remainingTime === 0) {
          
          setRemainingTime(totalSeconds);
        }
        
        const newTimer = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              clearInterval(newTimer);
              setTimer(null);
              setIsPaused(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimer(newTimer);
      } else {
        
        clearInterval(timer!);
        setTimer(null);
      }
      setIsPaused(!isPaused);
    }
  };

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setRemainingTime(0);
    setHours('0');
    setMinutes('0');
    setSeconds('0');
    setIsPaused(true); 
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleMinuteChange = (value: string) => {
    if (/^\d*$/.test(value) && Number(value) < 60) {
      setMinutes(value);
    }
  };

  const handleSecondChange = (value: string) => {
    if (/^\d*$/.test(value) && Number(value) < 60) {
      setSeconds(value);
    }
  };

  // Calculate strokeDasharray and strokeDashoffset for circular progress
  const radius = 90; // Circle radius
  const strokeWidth = 15;
  const strokeDasharray = 2 * Math.PI * radius; // Circumference
  const totalSeconds = Math.max(1, Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)); // Ensure totalSeconds is at least 1 for the calculation
  const strokeDashoffset = strokeDasharray - (remainingTime / totalSeconds) * strokeDasharray;

  return (
    <View style={styles.timerScreen}>
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#254a59"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#58b1bb"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin="100, 100"
        />
        <SvgText
          x="100"
          y="100"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="bold"
        >
          {formatTime(remainingTime)}
        </SvgText>
      </Svg>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Horas"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Minutos"
          keyboardType="numeric"
          value={minutes}
          onChangeText={handleMinuteChange}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Segundos"
          keyboardType="numeric"
          value={seconds}
          onChangeText={handleSecondChange}
          placeholderTextColor="#ccc"
        />
      </View>
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={toggleTimer}>
    <Text style={styles.buttonText}>{isPaused ? "Start" : "Pause"}</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={resetTimer}>
    <Text style={styles.buttonText}>Reset</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};






  




























// Cronometer Screen Component
const CronometerScreen: React.FC = () => {
  const [start, setStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startCronometer = () => {
    if (!start) {
      setStart(true);
      setTimer(
        setInterval(() => {
          setElapsedTime(prev => prev + 1);
        }, 1000)
      );
    }
  };

  const pauseCronometer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setStart(false);
  };

  const resumeCronometer = () => {
    if (!start) {
      setStart(true);
      setTimer(
        setInterval(() => {
          setElapsedTime(prev => prev + 1);
        }, 1000)
      );
    }
  };

  const resetCronometer = () => {
    pauseCronometer();
    setElapsedTime(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.CronometerScreen}>
      <View style={styles.CronometerIndicatorContainer}>
        <Text style={styles.CronometerIndicatorText}>{formatTime(elapsedTime)}</Text>
      </View>
      
      <View style={styles.CronometerButtonContainer}>
        {start ? (
          <TouchableOpacity style={styles.CronometerButton} onPress={pauseCronometer}>
            <Text style={styles.CronometerButtonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.CronometerButton} onPress={resumeCronometer}>
            <Text style={styles.CronometerButtonText}>Start</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.CronometerButton} onPress={resetCronometer}>
          <Text style={styles.CronometerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

















//SEQUENCE SCREENNNN
interface Task {
  id: number;
  name: string;
  duration: number;
}

const SequenceScreen: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [totalSeries, setTotalSeries] = useState<number>(0);
  const [remainingSeries, setRemainingSeries] = useState<number>(0);
  const [seriesCount, setSeriesCount] = useState(''); // Default to empty string
  const [toastMessage, setToastMessage] = useState('');
  const [showSequence, setShowSequence] = useState(false);
  

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTaskIndex !== null) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          completeTask();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, currentTaskIndex]);

  const completeTask = () => {
    const completedTask = tasksData[currentTaskIndex!];
    setToastMessage(`Tarefa "${completedTask.name}" completa!`);

    setTimeout(() => {
      setToastMessage('');
    }, 5000);

    if (currentTaskIndex === tasksData.length - 1) {
      if (remainingSeries > 1) {
        setRemainingSeries((prev) => prev - 1);
        setCurrentTaskIndex(0);
        setSeconds(tasksData[0].duration);
      } else {
        setIsRunning(false);
        setCurrentTaskIndex(null);
        setShowSequence(false);
      }
    } else {
      setCurrentTaskIndex((prev) => (prev! + 1));
      setSeconds(tasksData[currentTaskIndex! + 1].duration);
    }
  };

  const handleAddTask = () => {
    if (tasksData.length >= 6) {
      setToastMessage('Máximo Atingido.');
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return; // Prevent adding more than 6 tasks
    }
  
    if (taskName && taskDuration) {
      const newTask: Task = {
        id: tasksData.length,
        name: taskName,
        duration: parseInt(taskDuration, 10),
      };
      setTasksData((prev) => [...prev, newTask]);
      setTaskName('');
      setTaskDuration('');
      if (totalSeries > 0 && !isRunning) {
        setRemainingSeries(totalSeries);
      }
    }
  };
  

  const handleToggle = () => {
    if (tasksData.length > 0 && totalSeries > 0) {
      if (!isRunning) {
        if (currentTaskIndex === null) {
          setCurrentTaskIndex(0);
          setRemainingSeries(totalSeries);
          setSeconds(tasksData[0].duration);
          setShowSequence(true);
        }
      }
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setCurrentTaskIndex(null);
    setTotalSeries(0);
    setRemainingSeries(0);
    setShowSequence(false);
    setSeriesCount(''); // Set seriesCount to an empty string when resetting
  };

  const handleTaskDurationChange = (input: string) => {
    const numericValue = parseInt(input);
    if (input === '' || (numericValue > 0 && numericValue <= 120 && input.length <= 3)) {
      setTaskDuration(input);
    }
  };

  const handleSeriesCountChange = (input: string) => {
    if (input === '' || (input.length <= 2 && /^\d+$/.test(input))) { // Allow empty input or up to 2 digits
        const numericValue = parseInt(input, 10);
        setSeriesCount(input);
        setTotalSeries(numericValue > 0 ? numericValue : 0); // Only update totalSeries if numericValue is greater than 0
        if (numericValue === 1 && !isRunning) {
            handleToggle(); // Start automatically when a valid number is input and not running
        }
    }
};


  const handleDeleteTask = (id: number) => {
    setTasksData((prev) => prev.filter((task) => task.id !== id));
    if (currentTaskIndex !== null && id === tasksData[currentTaskIndex].id) {
      setCurrentTaskIndex(null);
      setSeconds(0);
      setIsRunning(false);
      setShowSequence(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const isDisabled = isRunning || (currentTaskIndex !== null && seconds > 0);

  return (
    <View style={styles.SequenceContainer}>
      {showSequence && currentTaskIndex !== null && (
        <>
          <Text style={[styles.SequenceTimerText, styles.whiteBold]}>
            {Math.floor(seconds / 60).toString().padStart(2, '0')}:
            {(seconds % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={[styles.SequenceCurrentTaskText, styles.whiteBold]}>
            {tasksData[currentTaskIndex].name}
          </Text>
          <Text style={[styles.SequenceSeriesCounterText, styles.whiteBold]}>
            {totalSeries - remainingSeries}/{totalSeries}
          </Text>
        </>
      )}

      {!showSequence && (
        <FlatList
          data={tasksData}
          renderItem={({ item }) => (
            <View style={styles.SequenceTaskItem}>
              <View style={styles.TaskRow}>
                <Text style={styles.TaskName}>{item.name}</Text>
                <View style={styles.TaskDetails}>
                  <Text style={styles.TaskDuration}>{formatDuration(item.duration)}</Text>
                  <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                    <Text style={styles.SequenceDeleteButton}>❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <View style={styles.BottomLocked}>
        <View style={styles.SequenceButtonContainer}>
          <TouchableOpacity style={styles.SequenceButton} onPress={handleToggle}>
            <Text style={styles.SequenceButtonText}>{isRunning ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.SequenceButton} onPress={handleReset}>
            <Text style={styles.SequenceButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.SequenceSeriesContainer}>
          <View style={styles.SeriesInputWrapper}>
            <Text style={styles.SeriesLabel}>Séries: </Text>
            <TextInput
              style={styles.SequenceInput}
              keyboardType="numeric"
              value={seriesCount}
              onChangeText={handleSeriesCountChange}
              textAlign="center"
              editable={!isDisabled} // Disable input when running or paused
            />
          </View>
        </View>

        <View style={styles.SequenceInputContainer}>
          <TextInput
            style={styles.SequenceInput}
            placeholder="Nome da tarefa"
            placeholderTextColor="#D3D3D3"
            value={taskName}
            onChangeText={setTaskName}
            editable={!isDisabled} // Disable input when running or paused
          />
        </View>

        <View style={styles.SequenceInputContainer}>
          <TextInput
            style={styles.SequenceInput}
            placeholder="Duração (1-120s)"
            keyboardType="numeric"
            placeholderTextColor="#D3D3D3"
            value={taskDuration}
            onChangeText={handleTaskDurationChange}
            editable={!isDisabled} // Disable input when running or paused
          />
          <TouchableOpacity
            style={styles.SequenceAddButton}
            onPress={handleAddTask}
            disabled={isDisabled} // Disable button when running or paused
          >
            <Text style={styles.SequenceButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {toastMessage && (
          <View style={styles.SequenceToast}>
            <Text style={styles.SequenceToastText}>{toastMessage}</Text>
          </View>
        )}
      </View>
    </View>
  );
};














// TIMER SCREEN
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17272e',
    paddingTop: 50,
  },
  fixedButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerScreen: {
    alignItems: 'center',
  },
  screenText: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 40,
  },
  input: {
    height: 40,
    backgroundColor: '#0F2026',
    paddingHorizontal: 10,
    color: '#FFFFFF',
    marginHorizontal: 5,
    width: 100,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  marginBottom: 40,
  width: '70%', // Ensure the container takes full width
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},
button: {
  backgroundColor: '#1f4a5c', // Default button color
  borderRadius: 10, // Rounded corners
  paddingVertical: 15, // Increase vertical padding for height
  paddingHorizontal: 25, // Increase horizontal padding for width
  marginHorizontal: 5, // Space between buttons
  alignItems: 'center', // Center text
  flex: 1, // Allow buttons to expand evenly
},
buttonText: {
  color: '#FFFFFF', // Text color
  fontSize: 18, // Larger font size for better readability
  fontWeight: 'bold', // Make text bold
},










// CRONOMETER SCREEN
CronometerScreen: {  // Changed this style name
  width: "90%",
  alignItems: 'center',
  backgroundColor: '#0f2026', // Background color to match TimerScreen
  borderRadius: 10, // Add rounded corners
  padding: 20, // Add padding
  shadowColor: '#000', // Add shadow for elevation
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5, // Elevation for Android
},
CronometerIndicatorContainer: { // Changed this style name
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: '#0f2026', // Consistent color theme
  borderRadius: 5,
  padding: 10,
},
CronometerIndicatorText: { // Changed this style name
  color: '#FFFFFF',
  fontSize: 60, // Larger font size for better visibility
  fontWeight: 'bold',
},
CronometerButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  marginBottom: 40,
  width: '100%', // Ensure the container takes full width
},
CronometerButton: {
  backgroundColor: '#1f4a5c', // Default button color
  borderRadius: 10, // Rounded corners
  paddingVertical: 15, // Increase vertical padding for height
  paddingHorizontal: 25, // Increase horizontal padding for width
  marginHorizontal: 5, // Space between buttons
  alignItems: 'center', // Center text
  flex: 1, // Allow buttons to expand evenly
},
CronometerButtonText: {
  color: '#FFFFFF', // Text color
  fontSize: 18, // Larger font size for better readability
  fontWeight: 'bold', // Make text bold
},








// SEQUENCE SCREEN
SequenceContainer: {
  width: "95%",
  flex: 1,
  padding: 20,
  alignItems: 'center',
  backgroundColor: '#17272E',
  marginTop:25,
},
SequenceTimerText: {
  fontSize: 70,
  fontWeight: 'bold',
  backgroundColor: "#0F2026",
  padding:20,
  borderRadius:50,
},
SequenceCurrentTaskText: {
  fontSize: 40,
  marginTop: 10,
},
SequenceSeriesCounterText: {
  fontSize: 30,
  marginTop: 10,
},
SequenceInputContainer: {
  flexDirection: 'row',
  marginTop: 20,
},
SequenceInput: {
  backgroundColor: '#0F2026',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  flex: 1,
  color:'#D3D3D3',
  textAlign: 'center',
},
SequenceAddButton: {
  backgroundColor: '#E7B12C',
  padding: 20,
  borderRadius: 20,
},
SequenceButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  marginBottom: 10,
  width: '100%', // Ensure the container takes full width
},
SequenceButton: {
  backgroundColor: '#1f4a5c', // Default button color
  borderRadius: 10, // Rounded corners
  paddingVertical: 15, // Increase vertical padding for height
  paddingHorizontal: 25, // Increase horizontal padding for width
  marginHorizontal: 5, // Space between buttons
  alignItems: 'center', // Center text
  flex: 1, // Allow buttons to expand evenly
},
SequenceSeriesContainer: {
  flexDirection: 'row',
  marginTop: 20,
  width:100,
},
SequenceTaskItem: {
  width: "95%",
  padding: 10,
  borderColor: '#ccc',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
SequenceDeleteButton: {
  marginLeft: 20,
  fontSize: 20,
  color: '#ff0000',
},
SequenceToast: {
  position: 'absolute',
  bottom: 50,
  left: '50%',
  transform: [{ translateX: -50 }],
  backgroundColor: '#ffcc00',
  padding: 10,
  borderRadius: 5,
},
SequenceToastText: {
  color: '#0F2026',
},
SequenceButtonText: {
  color: '#0F2026', // Text color
  fontSize: 18, // Larger font size for better readability
  fontWeight: 'bold', // Make text bold
},
TaskRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
TaskName: {
  flex: 1,
  fontSize: 18,  // Increase font size for task name
  color: '#D3D3D3', // Change text color to white
},
TaskDetails: {
  flexDirection: 'row',
  alignItems: 'center',
},
TaskDuration: {
  fontSize: 16,  // Increase font size for duration
  color: '#D3D3D3', // Change text color to white
},
SeriesInputWrapper: {
  flexDirection: 'row', // Align children horizontally
  alignItems: 'center',  // Center align items vertically
  width:120,
},
SeriesLabel: {
  marginRight: 10, // Space between the TextInput and the label
  fontSize: 18,  // Increase font size for task name
  color: '#D3D3D3', // Change text color to white
},
whiteBold: {
  color: '#FFFFFF', // White color
  fontWeight: 'bold', // Bold text
},
BottomLocked: {
  position: 'absolute',
  bottom: 50,
  left: 0,
  right: 0,
  padding: 16, // Optional: add padding for better spacing
  alignItems: 'center',

},







});

export default Time;
