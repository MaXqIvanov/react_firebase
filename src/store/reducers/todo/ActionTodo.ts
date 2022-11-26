import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../../firebase';
import Cookies from 'js-cookie'
import {v4} from 'uuid'
import { getBlob, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const CreateTodo = createAsyncThunk(
    'todo/CreateTodo',
    async (params: any, { getState }: any) => {
        const id = v4()
        const id_task = v4() + Math.floor(Math.random() * 100)
        const user = Cookies.get('user')
        params.uid = JSON.parse(user).uid
        params.id = id
        params.tasks = [{
            id: id_task,
            name: '',
            complete: false,
            file: '',
            file_name: '',
            finish_date: '',
            description: '',
        }]
        const response = await setDoc(doc(db, "todos", id), params);
        return {response, params}
    }
);
// const usersCollectionRef = collection(db, 'users');
export const GetTodo = createAsyncThunk(
    'todo/GetTodo',
    async (params: any, { getState }: any) => {
        const user = Cookies.get('user')
        const q = query(collection(db, "todos"), where("uid", "==", JSON.parse(user).uid));
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
        console.log(getState().todo.current_todo);
        
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
// upload file
export const uploadFile = createAsyncThunk(
    'todo/uploadFile',
    async (params: any, { getState }: any) => {
        console.log(params);
        console.log(getState().todo.current_todo);
        
        const washingtonRef = doc(db, "todos", getState().todo.current_todo.id);
        const response2 = await updateDoc(washingtonRef, getState().todo.current_todo);
        console.log(response2);
        
        const storage = getStorage();
        const storageRef = ref(storage, getState().todo.current_todo.tasks[getState().todo.current_index_task].file);
        const response = uploadBytes(storageRef, params.file)
        console.log(response);
        

        return {response, params}
    }
);

export const getFile = createAsyncThunk(
    'todo/getFile',
    async (params: any, { getState }: any) => {
        const storage = getStorage();
        const response = await getBlob(ref(storage, `gs://todo-ec422.appspot.com/${params.task.file}`))
        const imageURL = URL.createObjectURL(response)
        const link:any = document.createElement('a')
        link.href = imageURL
        link.download = `${params.task.file_name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
);

