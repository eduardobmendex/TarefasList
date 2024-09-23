import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../../components/TaskList'; 
import TaskModal from '../../components/TaskModal.js';
const STORAGE_KEY = '@tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonTasks) {
        setTasks(JSON.parse(jsonTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now().toString(), text: task }];
    setTasks(newTasks);
    saveTasks(newTasks);
    setModalVisible(false);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const editTask = (id, updatedText) => {
    const newTasks = tasks.map(task => (task.id === id ? { ...task, text: updatedText } : task));
    setTasks(newTasks);
    saveTasks(newTasks);
    setModalVisible(false);
    setTaskToEdit(null); // Resetar a tarefa a ser editada
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Task" onPress={() => {
        setTaskToEdit(null);
        setModalVisible(true);
      }} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={openEditModal} />
      <TaskModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        onAddTask={addTask} 
        taskToEdit={taskToEdit} 
        onEditTask={editTask} 
      />
    </View>
  );
};

export default App;
