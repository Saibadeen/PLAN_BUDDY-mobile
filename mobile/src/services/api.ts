import { CreatePlanResponse } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const generatePlan = async (goal: string, horizon: 'today' | 'week'): Promise<CreatePlanResponse> => {
  try {
    const response = await fetch(`${API_URL}/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal, horizon }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate plan');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
