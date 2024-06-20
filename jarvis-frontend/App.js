import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TaskEntry from './screens/tasks/TaskEntry';
import Login from './screens/user-login-signup/Login';
import SignUp from './screens/user-login-signup/SignUp';
import AllTasks from './screens/tasks/AllTasks';

// Prevent the splash screen from auto hiding
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide when the fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="TaskEntry" component={TaskEntry} options={{ title: 'Task Entry' }} />
          <Stack.Screen name="AllTasks" component={AllTasks} options={{ title: 'All Tasks' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
