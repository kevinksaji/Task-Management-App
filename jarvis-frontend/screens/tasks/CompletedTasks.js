import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from "react-native";

export default function CompletedTasks({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const fetchCompletedTasks = () => {
    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:8080/tasks/completed"
        : "http://localhost:8080/tasks/completed";
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching completed tasks:", error));
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>{item.name}</Text>
            <Text style={styles.taskText}>{item.dueDate}</Text>
            <Text style={styles.taskText}>{item.priority}</Text>
            <Text style={styles.taskText}>{item.category}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
  task: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginBottom: 10,
  },
  taskText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
