import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';

import {addTodo, fetchedTodos, requestTodos} from '../ducks/todos';
import ListItem from './ListItem';

export default function Todo() {
  const dispatch = useDispatch();
  const {isLoading, todos} = useSelector((state) => state.todo);

  const [content, setContent] = useState('');

  const fetchTodos = () => {
    dispatch(requestTodos());
    Axios.get(
      'https://todolist-express-server.herokuapp.com/api/v1/todos',
    ).then((result) => {
      dispatch(fetchedTodos(result.data));
    });
  };

  useEffect(fetchTodos, []);

  const handleAddTodo = () => {
    setContent('');
    Axios.post('https://todolist-express-server.herokuapp.com/api/v1/todos', {
      content,
      done: false,
    }).then((result) => {
      // eslint-disable-next-line no-shadow
      const {id, content, done} = result.data[0];
      dispatch(
        addTodo({
          id,
          content,
          done,
        }),
      );
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Whats on your mind?</Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#6363637y"
            placeholder="e.g. carwash, groceries, etc"
            textAlign="left"
            onChangeText={(title) => {
              setContent(title);
              console.log(content);
            }}
            value={content}
            returnKeyType={Platform.OS === 'ios' ? 'default' : 'next'}
            onSubmitEditing={handleAddTodo}
            clearButtonMode="always"
          />
          <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          refreshing={isLoading}
          onRefresh={fetchTodos}
          keyExtractor={(item) => item.id}
          data={todos}
          renderItem={({item}) => {
            return <ListItem item={item} />;
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
