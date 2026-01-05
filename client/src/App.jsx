import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Scan from './pages/Scan';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Success from './pages/Success';
import Admin from './pages/Admin';

import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="scan" element={<Scan />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="success" element={<Success />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
