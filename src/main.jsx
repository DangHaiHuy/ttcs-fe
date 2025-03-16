import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ConfigAntd from './config/ConfigAntd.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConfigAntd>
                <App />
            </ConfigAntd>
        </PersistGate>
    </Provider>,
    // </StrictMode>,
);
