import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import Flight from './components/Flights/Flight';
import Selector from './components/Selector/Selector';

const Root: FC = () => {

  return (
    <section className="app">
      <Selector />
      <Flight />
    </section>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
