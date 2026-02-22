// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesktopBoard from './components/DesktopBoard/DesktopBoard';
import TaskDetailsPage from './pages/TaskDetailsPage';
import './styles/global.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DesktopBoard />} />
                <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;