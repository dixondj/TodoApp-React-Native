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
    /**
     * when requesting todo items from server, isLoading is set to true
     * so that loading indicator will show
     */
    case REQUEST_TODOS:
      return {
        ...state,
        isLoading: true,
      };

    /**
     * upon successfully getting todos from server, hide loading indicator
     * and sort the list by id, and separate done and undone tasks
     */
    case FETCHED_TODOS:
      return {
        ...state,
        isLoading: false,
        todos: [
          ...sortById(action.newTodos.filter((todo) => !todo.done)),
          ...sortById(action.newTodos.filter((todo) => todo.done)),
        ],
      };

    /**
     * new todo will be added on to the top of list
     */
    case ADD_TODO:
      return {
        ...state,
        todos: [action.newTodo, ...state.todos],
      };

    /**
     * is used to mark todo as done
     */
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todoId) {
            return action.updatedTodo; // updated item from API
          } else {
            return todo; // existing item
          }
        }),
      };
    /**
     * filter out the item which is not the same id as todo.id
     */
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
