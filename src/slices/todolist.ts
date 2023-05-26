import {createSlice} from '@reduxjs/toolkit';

interface state {
  todoList: any[];
}

const initialState:state = {
  todoList: []
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodo(state, action) {
      state.todoList = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default todoSlice;
export const {setTodo} = todoSlice.actions;