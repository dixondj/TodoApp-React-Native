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
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import Axios from 'axios';

import {addTodo, fetchedTodos, requestTodos} from '../ducks/todos';
import ListItem from './ListItem';

export default function Todo() {
  const dispatch = useDispatch();
  const {isLoading, todos} = useSelector((state: RootStateOrAny) => state.todo);
  const [content, setContent] = useState('');

  // the function will dispatch a request to fetch, where loading is true
  // call the Api
  // after successfuly fetched, it will display the data and loading will stop
  const fetchTodos = () => {
    dispatch(requestTodos());
    Axios.get(
      'https://todolist-express-server.herokuapp.com/api/v1/todos',
    ).then((result) => {
      dispatch(fetchedTodos(result.data));
    });
  };

  useEffect(fetchTodos, []);

  // this function wiill call the api and post the value to server
  // then will dispatch the necesarry result to change the state
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
            onChangeText={(title) => {
              setContent(title);
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
