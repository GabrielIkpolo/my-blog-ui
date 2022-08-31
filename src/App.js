import Home from './components/home/Home.jsx';
import TopBar from './components/topBar/TopBar.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Settings from './pages/settings/Settings.jsx';
import Single from './pages/single/Single';
import Write from './pages/write/Write.jsx';

import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context.js';


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={user ? < Navigate to='/' /> : <Register />} />
        <Route path='/post/:postId' element={<Single />} />
        <Route path='/write' element={user ? <Write /> : <Register />} />
        <Route path='/settings' element={user ? <Settings /> : <Register />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
