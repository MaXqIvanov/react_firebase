import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoPage } from './pages/TodoPage';

function App() {
  return (
    <div className="App">
  <Routes>
    <Route
      path={'/auth'}
      element={<TodoPage />}
    />
  </Routes>
    </div>
  );
}

export default App;
