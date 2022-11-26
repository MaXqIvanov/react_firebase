import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthPage } from './pages/AuthPage';
import { TodoPage } from './pages/TodoPage';
import Cookies from 'js-cookie';
import { Header } from './components/Header';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LinearProgress } from '@mui/material';

function App() {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const { loading } = useSelector((state: RootState) => state.todo);
  useEffect(() => {
    if (!token) {
      Cookies.remove('token');
      Cookies.remove('user');
      navigate('/auth');
    }
  }, []);

  return (
    <div className="App">
      {loading && <LinearProgress className={`linear_progress`} />}
      {token && <Header />}
      <Routes>
        <Route path={'/'} element={<TodoPage />} />
        <Route path={'/auth'} element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
