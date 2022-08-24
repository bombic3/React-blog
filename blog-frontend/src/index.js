import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import { legacy_createStore } from 'redux';

const root = createRoot(document.getElementById('root'));
const store = legacy_createStore(rootReducer, composeWithDevTools());

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
