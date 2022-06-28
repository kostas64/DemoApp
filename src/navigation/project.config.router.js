import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ProjectScreen from '../screens/ProjectScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const ProjectStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name={'Loading'} component={LoadingScreen} />
      <Stack.Screen
        name={'Project'}
        component={ProjectScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};
