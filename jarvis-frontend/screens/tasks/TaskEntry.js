import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Switch, Platform, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function TaskEntry({ navigation, route }) {
  const [isAuto, setIsAuto] = useState(true);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState("placeholder");
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [inputText, setInputText] = useState("");

  const { username, firstName, lastName } = route.params;

  const toggleSwitch = () => setIsAuto(previousState => !previousState);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (date) => {
    if (date === null) return "Due Date";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handlePrioritySelect = (itemValue) => {
    setPriority(itemValue);
    setShowPriorityPicker(false);
  };

  const resetInputs = () => {
    setDate(null);
    setPriority("placeholder");
    setTaskName("");
    setCategory("");
    setInputText("");
  };

  const handleSubmit = () => {
    if (!taskName || !date || !category || priority === "placeholder") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const task = {
      name: taskName,
      dueDate: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      category: category,
      priority: priority
    };

    const backendUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8080/tasks' : 'http://localhost:8080/tasks';

    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
      // Handle response data
      console.log('Task created:', data);
      Alert.alert("Success", "Task created successfully!");
      resetInputs();
    })
    .catch(error => {
      console.error('Error creating task:', error);
      Alert.alert("Error", "Failed to create task. Please check your network connection and backend server.");
    });
    // navigate to the AllTasks screen and send the username as a parameter and refresh the tasks
    navigation.navigate('AllTasks', { username: username, firstName: firstName, lastName: lastName });
  };

  const handleAutoSubmit = () => {
    if (!inputText) {
      Alert.alert("Error", "Please enter the task details");
      return;
    }
  
    const openaiUrl = 'https://api.openai.com/v1/chat/completions';
    const openaiApiKey = 'sk-proj-bptnPanPaSngmQyNa8xxT3BlbkFJ1ZkQqu7RpHpoQSSxwXk1'; // Replace with your actual OpenAI API key
  
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Extract the following details from this task description: ${inputText}\nTask Name: \nDue Date: \nCategory: \nPriority: `
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    };
  
    axios.post(openaiUrl, requestData, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('OpenAI API Response:', response.data);
  
      const extractedText = response.data.choices[0].message.content.trim();
      const taskDetails = extractedText.split('\n').reduce((details, line) => {
        const [key, ...value] = line.split(':');
        if (key && value) {
          details[key.trim().toLowerCase()] = value.join(':').trim();
        }
        return details;
      }, {});
  
      const taskData = {
        name: taskDetails["task name"],
        dueDate: taskDetails["due date"],
        category: taskDetails["category"],
        priority: taskDetails["priority"]
      };
  
      if (!taskData.name || !taskData.dueDate || !taskData.category || !taskData.priority) {
        Alert.alert("Error", "Failed to extract task details. Please enter valid task information.");
        return;
      }
  
      const backendUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8080/tasks' : 'http://localhost:8080/tasks';
  
      fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Task created:', data);
        Alert.alert("Success", "Task created successfully!");
        resetInputs();
      })
      .catch(error => {
        console.error('Error creating task:', error);
        Alert.alert("Error", "Failed to create task. Please check your network connection and backend server.");
      });
      navigation.navigate('AllTasks', { username: username, firstName: firstName, lastName: lastName });
    })
    .catch(error => {
      console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to process task details. Please check your OpenAI API key and network connection.");
    });
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Jarvis.</Text>
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Manual</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAuto ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAuto}
          />
          <Text style={styles.toggleLabel}>Auto</Text>
        </View>
        {isAuto ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type here.."
              placeholderTextColor="#ccc"
              value={inputText}
              onChangeText={setInputText}
            />
            <Button title="Submit" onPress={handleAutoSubmit} color="grey" />
          </View>
        ) : (
          <View style={styles.manualInputContainer}>
            <View style={styles.row}>
              <TextInput
                style={styles.smallInput}
                placeholder="Task Name"
                placeholderTextColor="#ccc"
                value={taskName}
                onChangeText={setTaskName}
              />
              <TouchableOpacity
                style={styles.smallInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={date ? styles.inputText : styles.placeholderText}>
                  {date ? formatDate(date) : "Due Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  onClose={() => setShowDatePicker(false)}
                />
              )}
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.smallInput}
                placeholder="Category"
                placeholderTextColor="#ccc"
                value={category}
                onChangeText={setCategory}
              />
              <TouchableOpacity
                style={[styles.smallInput, styles.priorityInput]}
                onPress={() => setShowPriorityPicker(true)}
              >
                <Text style={priority === "placeholder" ? styles.placeholderText : styles.inputText}>
                  {priority === "placeholder" ? "Priority" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </TouchableOpacity>
              {showPriorityPicker && (
                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={showPriorityPicker}
                  onRequestClose={() => setShowPriorityPicker(false)}
                >
                  <TouchableWithoutFeedback onPress={() => setShowPriorityPicker(false)}>
                    <View style={styles.modalOverlay} />
                  </TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    {["Low", "Medium", "High"].map(item => (
                      <TouchableOpacity
                        key={item}
                        style={styles.modalItem}
                        onPress={() => handlePrioritySelect(item)}
                      >
                        <Text style={styles.modalItemText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Modal>
              )}
            </View>
            <View style={styles.buttonRow}>
              <Button title="Reset" onPress={resetInputs} color="grey" />
              <Button title="Submit" onPress={handleSubmit} color="grey" />
            </View>
          </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Tasks')} style={styles.link}>
          <Text style={styles.linkText}>View All Tasks</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 25,
    marginHorizontal: 10,
  },
  inputContainer: {
    borderWidth: 1,
    marginTop: 150,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    color: '#000',
  },
  manualInputContainer: {
    borderWidth: 1,
    padding: 10,
    marginTop: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallInput: {
    height: 50,
    width: '48%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    color: '#000',
    justifyContent: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
  priorityInput: {
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    justifyContent: 'center',
  },
  inputText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 20,
    padding: 20,
  },
  modalItem: {
    padding: 15,
  },
  modalItemText: {
    fontSize: 18,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
