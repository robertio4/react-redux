import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  GET_USER_EDIT,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from '../types';

const initialState = {
  users: [],
  error: null,
  loading: false,
  idUserDelete: null,
  userEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
    case GET_USERS:
    case EDIT_USER:
      return { ...state, loading: action.payload };
    case DELETE_USER:
      return { ...state, loading: true, idUserDelete: action.payload };
    case GET_USER_EDIT:
      return { ...state, loading: true, userEdit: action.payload };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: [...state.users, action.payload]
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        users: state.users.filter(user => user.id !== state.idUserDelete),
        idUserDelete: null
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        users: state.users.map(user =>
          user.id === action.payload.id ? (user = action.payload) : user
        ),
        userEdit: null
      };
    case ADD_USER_ERROR:
    case GET_USERS_ERROR:
    case DELETE_USER_ERROR:
    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userEdit: null,
        idUserDelete: null
      };
    default:
      return state;
  }
}
