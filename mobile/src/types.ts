export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
  emoji?: string;
  completed: boolean;
}

export interface Plan {
  tasks: Task[];
  createdAt: string;
}

export interface CreatePlanResponse {
  tasks: Omit<Task, 'completed'>[];
}

export type RootStackParamList = {
  CreatePlan: undefined;
  Plan: undefined;
};
