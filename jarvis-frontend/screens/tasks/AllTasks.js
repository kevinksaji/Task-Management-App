import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from "react-native";

export default function AllTasks({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const { username } = route.params;

  const fetchTasks = () => {
    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:8080/tasks"
        : "http://localhost:8080/tasks";
    console.log(`Fetching tasks from ${backendUrl}?sortBy=${sortBy}`);
    fetch(`${backendUrl}?sortBy=${sortBy}`) // Fetch tasks sorted by sortBy
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched tasks:', data);
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, [sortBy]);

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
        onPress={() => navigation.navigate('TaskEntry', { username })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create Task</Text>
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
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
    backgroundColor: '#333',
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
