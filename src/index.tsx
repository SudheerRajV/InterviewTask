import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import ProtectedRoutes from './components/ProtectedRoutes';
import SignUp from './components/SignUp';

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/register" element = {<SignUp/>}/>
      <Route index element = {
        <ProtectedRoutes chlidren={<Products/>}/>
      }
      />
      <Route path="*" element={<div><h2>Page Not Found</h2></div>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 
    <RouterProvider router = {browserRouter}/>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
