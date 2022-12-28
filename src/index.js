import React from 'react';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './Store/auth-context';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>    
  </AuthContextProvider>
);