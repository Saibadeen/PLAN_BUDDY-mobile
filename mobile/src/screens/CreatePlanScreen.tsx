import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { generatePlan } from '../services/api';
import { savePlan } from '../services/storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePlan'>;

export default function CreatePlanScreen({ navigation }: Props) {
  const [goal, setGoal] = useState('');
  const [horizon, setHorizon] = useState<'today' | 'week'>('today');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) {
      Alert.alert('Error', 'Please enter a goal');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await generatePlan(goal, horizon);
      const newPlan = {
        tasks: response.tasks.map(t => ({ ...t, completed: false })),
        createdAt: new Date().toISOString(),
      };
      await savePlan(newPlan);
      navigation.replace('Plan');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView 
      style={styles.container}
    >
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Plan')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PlanBuddy</Text>
        <Text style={styles.subtitle}>Turn your goals into action.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>What is your goal?</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your goal"
            value={goal}
            onChangeText={setGoal}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time Horizon</Text>
          <View style={styles.horizonContainer}>
            <TouchableOpacity
              style={[styles.horizonButton, horizon === 'today' && styles.horizonButtonActive]}
              onPress={() => setHorizon('today')}
            >
              <Text style={[styles.horizonText, horizon === 'today' && styles.horizonTextActive]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.horizonButton, horizon === 'week' && styles.horizonButtonActive]}
              onPress={() => setHorizon('week')}
            >
              <Text style={[styles.horizonText, horizon === 'week' && styles.horizonTextActive]}>This Week</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Plan</Text>
          )}
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 18,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  horizonContainer: {
    flexDirection: 'row',
  },
  horizonButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginRight: 12,
  },
  horizonButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  horizonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  horizonTextActive: {
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});
