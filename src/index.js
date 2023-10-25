import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NotificationContextProvider from './Provider/Notification/NotificactionContextProvider';
import Loader from './components/Loader/Loader';
import Alert from './components/Alert/Alert';
import LoaderStatic from 'src/components/Loader/LoaderStatic';
import RouterMain from './Main/MainRouter';
import reportWebVitals from './reportWebVitals';


const AuthComponent = React.lazy(() => import('./Auth/Auth'));
const LogoutComponent = React.lazy(() => import('./Auth/Logout/Logout'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationContextProvider>
  <Loader />
  <Alert />
  <React.Suspense fallback={<LoaderStatic />}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AuthComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        { RouterMain }
      </Routes>
    </BrowserRouter>
  </React.Suspense>
</NotificationContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
