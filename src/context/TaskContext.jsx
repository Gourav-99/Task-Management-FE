import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  tasks: { tasks: [], total: 0 },
  loading: false,
  error: null,
  query: { page: 1, limit: 5, filter: 'all', sort: 'asc', search: '' },
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, tasks: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_QUERY':
      return { ...state, query: { ...state.query, ...action.payload } };
    default:
      return state;
  }
}

const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    const { page, limit, filter, sort, search } = state.query;
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
        params: { page, limit, filter, sort, search },
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e.message });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [state.query]);

  const setQuery = (payload) => dispatch({ type: 'SET_QUERY', payload });

  return (
    <TaskContext.Provider value={{ state, dispatch, fetchTasks, setQuery }}>
      {children}
    </TaskContext.Provider>
  );
};
