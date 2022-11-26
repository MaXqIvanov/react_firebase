import { TTodo, todoState, TTodos } from './../../../ts/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

import { ChangeTodo, createTask, CreateTodo, DeleteTodo, GetTodo } from './ActionTodo';
import { v4 } from 'uuid';

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
    /**
     * function to write variables on click current todo
     * @param {Object} state this is state for in global store
     * @param {Object} action have { payload: { todo: TTodo; index: number } }
     */
    setCurrentTodo(state: todoState, action: { payload: { todo: TTodo; index: number } }) {
      state.current_todo = action.payload.todo;
      state.current_index = action.payload.index;
    },
    /**
     * function to write variables on click current task
     * @param {Object} state this is state for in global store
     * @param {Object} action have { payload: { index: number; index_task: number } }
     */
    setCurrentTask(state: todoState, action: { payload: { index: number; index_task: number } }) {
      state.current_index_task = action.payload.index_task;
      state.current_index = action.payload.index;
    },
    /**
     * function for change current todo and write new todo, which was changed
     * @param {Object} state this is state for in global store
     * @param {Object} action have { payload: Object }
     */
    changeCurrentTodo(state: todoState, action: { payload: Object }) {
      const params = action.payload;
      state.todos[state.current_index] = { ...state.todos[state.current_index], ...params };
    },
    /**
     * function for change current task and write new task, which was changed
     * @param {Object} state this is state for in global store
     * @param {Object} action have { payload: Object }
     */
    changeCurrentTask(state: todoState, action: { payload: Object }) {
      const params = action.payload;
      state.todos[state.current_index].tasks[state.current_index_task] = {
        ...state.todos[state.current_index].tasks[state.current_index_task],
        ...params,
      };
      state.current_todo.tasks[state.current_index_task] = {
        ...state.todos[state.current_index].tasks[state.current_index_task],
        ...params,
      };
    },
    /**
     * function for added new task for current todo list
     * @param {Object} state this is state for in global store
     * @param {Object} action have  { payload: { index: number } }
     */
    addNewTask(state: todoState, action: { payload: { index: number } }) {
      const id_task = v4() + Math.floor(Math.random() * 100);
      state.current_todo.tasks = [
        ...state.todos[action.payload.index].tasks,
        {
          id: id_task,
          name: '',
          complete: false,
          file: '',
          file_name: '',
          finish_date: '',
          description: '',
        },
      ];
      state.todos[action.payload.index].tasks = [
        ...state.todos[action.payload.index].tasks,
        {
          id: id_task,
          name: '',
          complete: false,
          file: '',
          file_name: '',
          finish_date: '',
          description: '',
        },
      ];
    },
    /**
     * function for delete task on click button
     * @param {Object} state this is state for in global store
     * @param {Object} action have  { payload: { index_task: number; index: number } }
     */
    deleteTask(state: todoState, action: { payload: { index_task: number; index: number } }) {
      state.todos[action.payload.index].tasks.splice(action.payload.index_task, 1);
      state.current_todo = state.todos[action.payload.index];
    },
    /**
     * function to upload file to server
     * @param {Object} state this is state for in global store
     * @param {Object} action have   { payload: { file: { name: string } } }
     */
    uploadTaskFile(state: todoState, action: { payload: { file: { name: string } } }) {
      console.log(action.payload);
      const id_file = v4() + Math.floor(Math.random() * 94);
      state.todos[state.current_index].tasks[state.current_index_task].file = id_file;
      state.todos[state.current_index].tasks[state.current_index_task].file_name =
        action.payload.file.name;
      state.current_todo = state.todos[state.current_index];
    },
    /**
     * function to upload file to server
     * @param {Object} state this is state for in global store
     * @param {Object} action have  { payload: { date: { $d: string } } }
     */
    changeDateTask(state: todoState, action: { payload: { date: { $d: string } } }) {
      console.log(action);

      state.todos[state.current_index].tasks[state.current_index_task].finish_date =
        '' + action.payload.date.$d;
      state.current_todo = state.todos[state.current_index];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      CreateTodo.fulfilled,
      (state: todoState, { payload }: PayloadAction<{ params: TTodo }>) => {
        console.log(payload);
        state.todos = [...state.todos, payload.params];
        state.loading = false;
      }
    );
    builder.addCase(CreateTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // GetTodo
    builder.addCase(GetTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      GetTodo.fulfilled,
      (state: todoState, { payload }: PayloadAction<{ response: any }>) => {
        console.log(payload);
        state.todos = payload.response;
        state.loading = false;
      }
    );
    builder.addCase(GetTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // DeleteTodo
    builder.addCase(DeleteTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(DeleteTodo.fulfilled, (state: todoState) => {
      state.todos.splice(state.current_index, 1);
      state.loading = false;
    });
    builder.addCase(DeleteTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // ChangeTodo
    builder.addCase(ChangeTodo.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(ChangeTodo.fulfilled, (state: todoState) => {
      state.loading = false;
    });
    builder.addCase(ChangeTodo.rejected, (state: todoState) => {
      state.loading = false;
    });
    // createTask
    builder.addCase(createTask.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state: todoState) => {
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
  addNewTask,
  deleteTask,
  uploadTaskFile,
  changeDateTask,
} = TodoSlice.actions;
