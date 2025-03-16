import { createStore } from 'redux';
import rootReducer from './reducer/reducer';
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer);
let persistor = persistStore(store);

export { store, persistor };
