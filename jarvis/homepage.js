import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Switch, Platform, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomePage() {
  const [isAuto, setIsAuto] = useState(true);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState("placeholder");
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");

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
              placeholder="Type here..."
              placeholderTextColor="#ccc"
            />
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
              <TextInput
                style={styles.smallInput}
                placeholder="Due Date"
                placeholderTextColor="#ccc"
                value={date ? formatDate(date) : ""}
                onFocus={() => setShowDatePicker(true)}
              />
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
                    {["low", "medium", "high"].map(item => (
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
            <Button title="Reset" onPress={resetInputs} color="#841584" />
          </View>
        )}
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
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
  },
  inputContainer: {
    borderWidth: 1,
    marginTop: 250,
    marginBottom: 20,
  },
  input: {
    height: 40,
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
    marginTop: 200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallInput: {
    height: 40,
    width: '48%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    color: '#000',
  },
  priorityInput: {
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ccc',
  },
  inputText: {
    color: '#000',
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
});
