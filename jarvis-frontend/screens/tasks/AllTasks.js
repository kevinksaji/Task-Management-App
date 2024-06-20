import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

export default function AllTasks({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("dueDate"); // Default sort by due date
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { username } = route.params;

  const fetchTasks = () => {
    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:8080/tasks/incomplete"
        : "http://localhost:8080/tasks/incomplete";
    fetch(`${backendUrl}?sortBy=${sortBy}`) // Fetch tasks sorted by sortBy
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const markTaskAsCompleted = (id) => {
    const backendUrl = Platform.OS === "android"
      ? `http://10.0.2.2:8080/tasks/${id}/complete`
      : `http://localhost:8080/tasks/${id}/complete`;

    fetch(backendUrl, {
      method: 'PUT',
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert("Success", "Task marked as completed!");
      setTasks(tasks.filter(task => task.id !== id));
      setSelectedTaskId(null); // Hide the button after completion
    })
    .catch(error => {
      console.error('Error marking task as completed:', error);
      Alert.alert("Error", "Failed to mark task as completed. Please check your network connection and backend server.");
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [sortBy])
  );

  const handleCardPress = (id) => {
    if (selectedTaskId === id) {
      setSelectedTaskId(null); // Hide button if same card is pressed again
    } else {
      setSelectedTaskId(id); // Show button for the selected card
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}</Text>
      <Picker
        selectedValue={sortBy}
        style={styles.picker}
        onValueChange={(itemValue) => setSortBy(itemValue)}
      >
        <Picker.Item label="Due Date" value="dueDate" />
        <Picker.Item label="Priority" value="priority" />
        <Picker.Item label="Category" value="category" />
      </Picker>
      <ScrollView style={styles.scrollContainer}>
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => handleCardPress(task.id)} style={styles.taskCard}>
            <View style={styles.task}>
              <Text style={styles.taskText}>Name: {task.name}</Text>
              <Text style={styles.taskText}>Due: {task.dueDate}</Text>
              <Text style={styles.taskText}>Priority: {task.priority}</Text>
              <Text style={styles.taskText}>Category: {task.category}</Text>
              {selectedTaskId === task.id && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => markTaskAsCompleted(task.id)}
                >
                  <Text style={styles.buttonText}>Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TaskEntry', { username })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CompletedTasks', { username })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Completed Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 50,
  },
  taskCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    position: 'relative', // Ensure the card is positioned relative for zIndex to work
  },
  task: {
    borderBottomColor: '#444',
  },
  taskText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
  },
  completeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    zIndex: 2, // Ensure the button is above the card
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
