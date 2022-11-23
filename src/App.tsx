import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthPage } from './pages/AuthPage';
import { TodoPage } from './pages/TodoPage';
import Cookies from 'js-cookie';
import { Header } from './components/Header';

function App() {
  const navigate = useNavigate()
  const token = Cookies.get('token')
  useEffect(() => {
    if(!token){
      navigate('/auth')
    }
  }, [])
  

  return (
    <div className="App">
      {token && <Header />}
      <Routes>
        <Route
          path={'/'}
          element={<TodoPage />}
        />
            <Route
          path={'/auth'}
          element={<AuthPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
