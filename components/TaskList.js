import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskContainer}>
          <Text>{item.text}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => editTask(item)} />
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TaskList;
