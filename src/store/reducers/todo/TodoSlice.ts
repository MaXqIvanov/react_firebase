import { TTodo } from './../../../ts/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { todoState } from '../../../ts/type';
import { ChangeTodo, createTask, CreateTodo, DeleteTodo, GetTodo } from './ActionTodo';
import {v4} from 'uuid'

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
const TodoSlice = createSlice({
  name: 'todo',
  initialState: {
    // loading
    loading: false,
    todos: [],
    current_todo: {} as TTodo,
    current_index: 1,
    current_index_task: 1,
  },
  reducers: {
    setCurrentTodo(state: todoState, action: {payload: {todo: TTodo, index: number}}) {
      state.current_todo = action.payload.todo
      state.current_index = action.payload.index
    },
    setCurrentTask(state: todoState, action: {payload: {index: number}}) {
      state.current_index_task = action.payload.index
    },
    changeCurrentTodo(state: todoState, action: any){
      const params = action.payload
      state.todos[state.current_index] = {...state.todos[state.current_index], ...params}
    },
    changeCurrentTask(state: todoState, action: any){
      const params = action.payload
      state.todos[state.current_index].tasks[state.current_index_task] = {...state.todos[state.current_index].tasks[state.current_index_task], ...params}
      state.current_todo.tasks[state.current_index_task] = {...state.todos[state.current_index].tasks[state.current_index_task], ...params}
    },
    addNewTask(state: todoState, action:any){
      const id_task = v4() + Math.floor(Math.random() * 100)
      state.current_todo.tasks = [...state.todos[action.payload.index].tasks, {id: id_task, name: '', complete: false}]
      state.todos[action.payload.index].tasks = [...state.todos[action.payload.index].tasks, {id: id_task, name: '', complete: false}]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(CreateTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(CreateTodo.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.todos = [...state.todos, payload.params]
      state.loading = false;
    });
    builder.addCase(CreateTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // GetTodo
    builder.addCase(GetTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(GetTodo.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.todos = payload.response
      state.loading = false;
    });
    builder.addCase(GetTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // DeleteTodo
    builder.addCase(DeleteTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(DeleteTodo.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.todos.splice(state.current_index, 1)
      state.loading = false;
    });
    builder.addCase(DeleteTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // ChangeTodo
    builder.addCase(ChangeTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(ChangeTodo.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.loading = false;
    });
    builder.addCase(ChangeTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // createTask
    builder.addCase(createTask.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      state.loading = false;
    });
    builder.addCase(createTask.rejected, (state: todoState) => {
      state.loading = false;
    });
  },
});

export default TodoSlice.reducer;
export const {
  setCurrentTodo,
  changeCurrentTodo,
  setCurrentTask,
  changeCurrentTask,
  addNewTask
} = TodoSlice.actions;