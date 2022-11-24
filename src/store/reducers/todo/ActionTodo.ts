import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from '../../../firebase';
import Cookies from 'js-cookie'
import {v4} from 'uuid'

export const CreateTodo = createAsyncThunk(
    'todo/CreateTodo',
    async (params: any, { getState }: any) => {
        const id = v4()
        params.token = Cookies.get('token')
        params.id = id
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
        const response = await deleteDoc(doc(db, "todos", params.id));
        return {response, params}
    }
);