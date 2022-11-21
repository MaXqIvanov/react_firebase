import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const store = setupStore();

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_KEY,
  authDomain: "react-todo-list-s.firebaseapp.com",
  projectId: "react-todo-list-s",
  storageBucket: "react-todo-list-s.appspot.com",
  messagingSenderId: "51663958244",
  appId: "1:51663958244:web:7496013d7313de1a56fcf1",
  measurementId: "G-LGL9GJ5HXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
