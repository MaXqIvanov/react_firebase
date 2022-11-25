import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../../firebase';
import Cookies from 'js-cookie'
import {v4} from 'uuid'

export const CreateTodo = createAsyncThunk(
    'todo/CreateTodo',
    async (params: any, { getState }: any) => {
        const id = v4()
        const id_task = v4() + Math.floor(Math.random() * 100)
        params.token = Cookies.get('token')
        params.id = id
        params.tasks = [{
            id: id_task,
            name: '',
            complete: false,
            file: ''
        }]
        const response = await setDoc(doc(db, "todos", id), params);
        return {response, params}
    }
);
// const usersCollectionRef = collection(db, 'users');
export const GetTodo = createAsyncThunk(
    'todo/GetTodo',
    async (params: any, { getState }: any) => {
        const q = query(collection(db, "todos"), where("token", "==", Cookies.get('token')));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const response: Array<Object> = []
        
        querySnapshot.forEach((doc) => {
            response.push(doc.data())
        });
        return {response, params}
    }
);

export const DeleteTodo = createAsyncThunk(
    'todo/DeleteTodo',
    async (params: any, { getState }: any) => {
        console.log(params);
        
        const response = await deleteDoc(doc(db, "todos", params.id));
        return {response, params}
    }
);

export const ChangeTodo = createAsyncThunk(
    'todo/ChangeTodo',
    async (params: any, { getState }: any) => {
        const washingtonRef = doc(db, "todos", params.id);
        console.log(params);
        // Set the "capital" field of the city 'DC'
        const response = await updateDoc(washingtonRef, getState().todo.current_todo);
        return {response, params}
    }
);
// createTask
export const createTask = createAsyncThunk(
    'todo/createTask',
    async (params: any, { getState }: any) => {
        
        const washingtonRef = doc(db, "todos", params.todo.id);
        const response = await updateDoc(washingtonRef, getState().todo.current_todo);
        return {response, params}
    }
);
// deleteTask