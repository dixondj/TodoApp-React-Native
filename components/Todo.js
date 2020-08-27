import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  RefreshControl,
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
    Axios.post('https://todolist-express-server.herokuapp.com/api/v1/todos', {
      content,
      done: false,
    }).then((result) => {
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
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontFamily: 'Raleway-bold', fontSize: 40}}>
            Whats on your mind?
          </Text>
          <TextInput
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 40,
              borderColor: '#636363',
              fontFamily: 'Raleway-ExtraLight',
              marginTop: 10,
              fontSize: 16,
              padding: 6,
            }}
            placeholderTextColor="#6363637y"
            placeholder="e.g. carwash, groceries, etc"
            textAlign="left"
            onChangeText={(title) => {
              setContent(title);
            }}
            value={content}
            returnKeyType={Platform.OS === 'ios' ? 'default' : 'next'}
            onSubmitEditing={handleAddTodo}
            //   keyboardType="numeric"
          />
          {/* <Button onPress={handleAddTodo} title="Add Todo" /> */}
          <TouchableOpacity
            onPress={handleAddTodo}
            style={{
              marginLeft: 'auto',
              marginTop: 14,
              // width: 60,
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 20,
              backgroundColor: '#8a162e',
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Raleway-Bold',
              }}>
              ADD
            </Text>
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
