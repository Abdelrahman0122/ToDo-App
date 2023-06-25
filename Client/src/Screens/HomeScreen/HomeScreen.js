import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext';

const HomeScreen = () => {
  const { userId } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${userId}`);
        const data = await response.json();
        setTodos(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchTodos();
  }, [userId]);

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  
  const handleUpdateTodo = async (id, isChecked) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isChecked: !isChecked, // Toggle the isChecked property
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isChecked: data.todo.isChecked } : todo
          )
        );
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  // add todo function
  const handleAddTodo = async () => {
    if (newTodoTitle.trim() === '') {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodoTitle.trim(),
          description: newTodoDescription.trim(),
          isChecked: false, // Default value for isChecked
          userId: userId, // Assuming you have a currentUser object with the current user's ID
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTodos((prevTodos) => [...prevTodos, data.todo]);
        setNewTodoTitle('');
        setNewTodoDescription('');
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const renderTodo = ({ item }) => {
    return (
      <View style={styles.todoItem}>
        <View style={styles.todoInfo}>
          <TouchableOpacity
            style={styles.todoCheckbox}
            onPress={() => handleUpdateTodo(item.id, item.isChecked)}
          >
            <View style={styles.checkboxIcon}>
              {item.isChecked && <View style={styles.checkboxChecked} />}
            </View>
          </TouchableOpacity>
          <View style={styles.todoDetails}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.todoDelete}
          onPress={() => handleDeleteTodo(item.id)}
        >
          <Text style={styles.todoDeleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userId}</Text>
      <FlatList data={todos} renderItem={renderTodo} keyExtractor={(item) => item.id.toString()} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          onChangeText={setNewTodoTitle}
          value={newTodoTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a description"
          multiline={true}
          onChangeText={setNewTodoDescription}
          value={newTodoDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCheckbox: {
    marginRight: 10,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#999',
  },
  todoDetails: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
  },
  todoDelete: {},
  todoDeleteText: {
    color: '#f00',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;