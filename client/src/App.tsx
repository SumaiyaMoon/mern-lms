import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './config/redux/store';
import AppRouter from './config/routers/router';

function App() {
  return (
    <Provider store={store}>
<AppRouter/>
    </Provider>
  );
}

export default App;

