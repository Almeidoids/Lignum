import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';



const Time: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'timer' | 'cronometer' | 'sequence'>('timer');

  return (
    <View style={styles.container}>
        
      <View style={styles.fixedButtonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Timer" onPress={() => setActiveFeature('timer')} color="#e7b12c" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cronômetro" onPress={() => setActiveFeature('cronometer')} color="#e7b12c" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Sequência" onPress={() => setActiveFeature('sequence')} color="#e7b12c" />
        </View>
      </View>
      <View style={styles.screenContainer}>
        {activeFeature === 'timer' && <TimerScreen />}
        {activeFeature === 'cronometer' && <CronometerScreen />}
        {activeFeature === 'sequence' && <SequenceScreen />}
      </View>
    </View>
  );
};

// Timer Screen Component
const TimerScreen: React.FC = () => {
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
  
    const startTimer = () => {
      const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      if (totalSeconds > 0 && !timer) {
        setRemainingTime(totalSeconds);
        setTimer(
          setInterval(() => {
            setRemainingTime(prev => {
              if (prev <= 1) {
                clearInterval(timer!);
                setTimer(null);
                return 0;
              }
              return prev - 1;
            });
          }, 1000)
        );
      }
    };
  
    const pauseTimer = () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
        setIsPaused(true);
      }
    };
  
    const resumeTimer = () => {
      if (isPaused) {
        setTimer(
          setInterval(() => {
            setRemainingTime(prev => {
              if (prev <= 1) {
                clearInterval(timer!);
                setTimer(null);
                return 0;
              }
              return prev - 1;
            });
          }, 1000)
        );
        setIsPaused(false);
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
      setIsPaused(false);
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
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
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
            placeholder="Hours"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Minutes"
            keyboardType="numeric"
            value={minutes}
            onChangeText={handleMinuteChange}
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Seconds"
            keyboardType="numeric"
            value={seconds}
            onChangeText={handleSecondChange}
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Start" onPress={startTimer} color="#03DAC6" />
            {isPaused ? (
                
                <Button title="Resume" onPress={resumeTimer} color="#03DAC6" />
            ) : (
                <Button title="Pause" onPress={pauseTimer} color="#FF3D00" />
            )}
            <Button title="Reset" onPress={resetTimer} color="#6200EE" />
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

    // Updated formatTime function to include hours
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <View style={styles.cronometerScreen}>
            {/* Display the formatted elapsed time */}
            <View style={styles.indicatorContainer}>
                <Text style={styles.indicatorText}>{formatTime(elapsedTime)}</Text>
            </View>
            
            {/* Button container for controlling the timer */}
            <View style={styles.buttonContainer}>
                <Button title="Start" onPress={startCronometer} color="#03DAC6" />
                {start ? (
                    <Button title="Pause" onPress={pauseCronometer} color="#FF3D00" />
                ) : (
                    <Button title="Resume" onPress={resumeCronometer} color="#03DAC6" />
                )}
                <Button title="Reset" onPress={resetCronometer} color="#6200EE" />
            </View>
        </View>
    );
};

  interface Task {
    name: string;
    estimatedPomodoros: number;
}

const SequenceScreen: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [pomodoros, setPomodoros] = useState('1');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTimerRunning && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsTimerRunning(false);
            alert('Pomodoro complete!');
        }

        return () => clearInterval(timer);
    }, [isTimerRunning, timeRemaining]);

    const addTask = () => {
        const newTask: Task = { name: taskName, estimatedPomodoros: parseInt(pomodoros) };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskName('');
        setPomodoros('1');
    };

    const startTimer = (task: Task) => {
        setSelectedTask(task);
        setTimeRemaining(25 * 60); // Reset timer to 25 minutes
        setIsTimerRunning(true);
    };

    return (
        <View style={styles.timerScreen}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={taskName}
                    onChangeText={setTaskName}
                    placeholder="Task Name"
                    placeholderTextColor="#ffffff"
                />
                <TextInput
                    style={styles.input}
                    value={pomodoros}
                    onChangeText={setPomodoros}
                    placeholder="Pomodoros (1=25min)"
                    keyboardType="numeric"
                />
                <Button title="Add Task" onPress={addTask} />
            </View>

            <FlatList
    data={tasks}
    renderItem={({ item }: { item: Task }) => (
        <TouchableOpacity onPress={() => startTimer(item)}>
            <Text style={styles.taskItem}>
                {item.name} - {item.estimatedPomodoros} Pomodoros
            </Text>
        </TouchableOpacity>
    )}
    keyExtractor={(item: Task, index: number) => index.toString()}
    style={styles.taskList}
/>


            {isTimerRunning && (

                




                <View style={styles.timerScreen}>
                    <Svg height="100" width="100">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#4caf50"
                            strokeWidth="10"
                            fill="none"
                        />
                        <SvgText
                            x="50%"
                            y="50%"
                            alignmentBaseline="middle"
                            textAnchor="middle"
                            fontSize="20"
                        >
                            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                        </SvgText>
                    </Svg>
                </View>
            )}
        </View>
    );
};
  
  

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
  cronometerScreen: {
    width: 350,
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
  indicatorContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#0f2026', // Consistent color theme
    borderRadius: 5,
    padding: 10,
  },
  indicatorText: {
    color: '#FFFFFF',
    fontSize: 60, // Larger font size for better visibility
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: '#58b1bb',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    marginHorizontal: 5,
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
    width: 230,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  sequenceScreen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tasksText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  taskList: {
    flex: 1,
    width: 300,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f5f5f5', // Light background for contrast
    borderRadius: 10,
},
taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Soft line between tasks
    fontSize: 16,
    color: '#333', // Dark text for readability
    backgroundColor: '#fff', // White background for each item
    borderRadius: 5,
    elevation: 1, // Subtle shadow for elevation
},
taskItemSelected: {
    backgroundColor: '#4caf50', // Highlighted color for selected task
    color: '#fff', // White text for contrast
},
timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},
});

export default Time;
