/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from 'react-native';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {deleteTodo, editTodo} from '../ducks/todos';
import UnselectedIcon from '../assets/icons/tnc-unselected.svg';
import {Icon} from 'react-native-elements';

export default function ListItem({item}) {
  const dispatch = useDispatch();

  const handleMarkAsDone = () => {
    dispatch(
      editTodo(item.id, {
        ...item,
        done: !item.done,
      }),
    );
    Axios.put(
      `https://todolist-express-server.herokuapp.com/api/v1/todos/${item.id}`,
      {
        done: !item.done,
      },
    ).then((result) => {
      //   dispatch(editTodo(item.id, result.data[0]));
    });
  };

  const handleEdit = (e) => {
    Axios.put(
      `https://todolist-express-server.herokuapp.com/api/v1/todos/${item.id}`,
      {
        content: e.nativeEvent.text,
      },
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
    Axios.delete(
      `https://todolist-express-server.herokuapp.com/api/v1/todos/${item.id}`,
    ).then(() => {});
  };

  return (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert(
          'Would you like to delete this task?',
          'Press OK to delete',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: handleDelete},
          ],
          {cancelable: false},
        )
      }
      style={{
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginTop: 17,
        // marginHorizontal: 10,
        borderRadius: 100,
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <TouchableWithoutFeedback onPress={handleMarkAsDone}>
        {item.done ? (
          <Icon
            name="check-circle"
            type="font-awesome-5"
            size={20}
            color="#8a162e"
          />
        ) : (
          <Icon name="circle" type="font-awesome-5" size={20} color="#ffcfd9" />
        )}
        {/* <Icon name="circle" type="font-awesome-5" size={20} /> */}
      </TouchableWithoutFeedback>
      <TextInput
        onEndEditing={handleEdit}
        style={item.done ? styles.textStyles2 : styles.textStyles1}>
        {item.content}
      </TextInput>
      {/* <Button title="X" onPress={handleDelete} /> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  textStyles1: {
    fontFamily: 'Raleway-ExtraLight',
    fontSize: 16,
    marginLeft: 20,
    color: 'black',
  },
  textStyles2: {
    fontFamily: 'Raleway-ExtraLight',
    fontSize: 16,
    marginLeft: 20,
    color: '#a3a3a3',
    textDecorationLine: 'line-through',
  },
});
