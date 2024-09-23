import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TaskModal = ({ isVisible, onClose, onAddTask, taskToEdit, onEditTask }) => {
  const [task, setTask] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.text);
    } else {
      setTask('');
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (taskToEdit) {
      onEditTask(taskToEdit.id, task); 
    } else {
      onAddTask(task); 
    }
    setTask('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{taskToEdit ? 'Edit Task' : 'Add Task'}</Text>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Task description"
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default TaskModal;
