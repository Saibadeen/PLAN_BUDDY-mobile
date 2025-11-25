import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plan } from '../types';

const PLAN_KEY = 'PLANBUDDY_PLAN';

export const savePlan = async (plan: Plan): Promise<void> => {
  try {
    await AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save plan', e);
  }
};

export const loadPlan = async (): Promise<Plan | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PLAN_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load plan', e);
    return null;
  }
};

export const clearPlan = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PLAN_KEY);
  } catch (e) {
    console.error('Failed to clear plan', e);
  }
};
