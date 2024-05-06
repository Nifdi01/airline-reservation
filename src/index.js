import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightList from './FlightList';
import MainPage from './MainPage';
import Cart from "./Cart";
import UpdateBalance from './UpdateBalance';
import reportWebVitals from './reportWebVitals';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/flight_list" element={<FlightList />} />
      <Route path="/update_balance" element={<UpdateBalance />} />
      <Route path="/booking_cart" element={<Cart />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Render the entire application inside React root */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
