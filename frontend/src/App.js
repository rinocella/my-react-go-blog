import { Routes, Route, Navigate } from "react-router-dom";

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PostsPage from './pages/PostsPage';

import { useContext } from 'react';
import AuthContext from './store/auth-context';


import logo from './logo.svg';
import './App.css';

function App() {
  const authContext = useContext(AuthContext);


  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <HomePage/>} />
        {!authContext.loggedIn &&(
        <Route path="/auth" element={  <AuthPage/>} />
        )}

        <Route path="/posts" element={!authContext.loggedIn ? <Navigate to="/auth" /> : PostsPage } />
        <Route path="*" element={ <Navigate to="/"/>} />

      </Routes>
    </Layout>
  );
}

export default App;
