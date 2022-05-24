import React , { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./i18nextInit";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Suspense fallback={<span>Loading...</span>}>
 <React.StrictMode>
    <App />
  </React.StrictMode>
  </Suspense>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

