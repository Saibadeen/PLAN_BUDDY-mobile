import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import CreatePlanScreen from '../screens/CreatePlanScreen';
import PlanScreen from '../screens/PlanScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Plan"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
