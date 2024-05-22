import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Jarvis.</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="#ccc"
        />
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
  titleContainer: {
    alignItems: 'center',
    borderWidth: 1, // Border width
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  inputContainer: {
    borderWidth: 1, // Border width
    marginTop: 300,
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
});
