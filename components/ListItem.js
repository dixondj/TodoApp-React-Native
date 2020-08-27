import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {deleteTodo, editTodo} from '../ducks/todos';
import {Icon} from 'react-native-elements';
import styles from './styles';

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
      style={styles.touchableList}>
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
      </TouchableWithoutFeedback>
      <TextInput
        onEndEditing={handleEdit}
        style={item.done ? styles.checkCircleIcon : styles.circleIcon}>
        {item.content}
      </TextInput>
    </TouchableOpacity>
  );
}
