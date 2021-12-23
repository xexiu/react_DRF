import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';
import Footer from './components/Footer';
import Header from './components/Header';
import Post from './components/Post';
import Search from './components/Search';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Admin from './components/admin/Admin';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/post/:id/:slug" element={<Post />} />
        <Route path="/search" element={<Search />} />
        {/* Admin */}
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/create" element={<Create />} />
        <Route exact path="/admin/edit/:id" element={<Edit />} />
        <Route exact path="/admin/delete/:id" element={<Delete />} />
      </Routes>
      <Footer />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
