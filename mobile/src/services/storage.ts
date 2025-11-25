import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plan } from '../types';

const PLAN_KEY = 'planbuddy_plan';

export const savePlan = async (plan: Plan): Promise<void> => {
  try {
    await AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  } catch (error) {
    console.error('Error saving plan:', error);
  }
};

export const loadPlan = async (): Promise<Plan | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PLAN_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading plan:', error);
    return null;
  }
};

export const clearPlan = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PLAN_KEY);
  } catch (error) {
    console.error('Error clearing plan:', error);
  }
};
