// CONSTANTS
const REQUEST_TODOS = 'REQUEST_TODOS';
const FETCHED_TODOS = 'FETCHED_TODOS';
const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';

// INITIAL STATES
const initialState = {
  todos: [],
  isLoading: false,
};

const sortById = (list) => list.sort((a, b) => b.id - a.id);

// REDUCER
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TODOS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCHED_TODOS:
      return {
        ...state,
        isLoading: false,
        todos: [
          ...sortById(action.newTodos.filter((todo) => !todo.done)),
          ...sortById(action.newTodos.filter((todo) => todo.done)),
        ],
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [action.newTodo, ...state.todos],
      };

    case EDIT_TODO:
      console.log('-----', action.todoId);
      console.log('+++++', action.updatedTodo);
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id == action.todoId) {
            return action.updatedTodo;
          } else {
            return todo;
          }
        }),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.todoId),
      };

    default:
      return state;
  }
}

// ACTIONS
export function addTodo(newTodo) {
  return {
    type: ADD_TODO,
    newTodo,
  };
}

export function deleteTodo(todoId) {
  return {
    type: DELETE_TODO,
    todoId,
  };
}

export function editTodo(todoId, updatedTodo) {
  return {
    type: EDIT_TODO,
    todoId,
    updatedTodo,
  };
}

export function requestTodos() {
  return {
    type: REQUEST_TODOS,
  };
}

export function fetchedTodos(newTodos) {
  return {
    type: FETCHED_TODOS,
    newTodos,
  };
}
