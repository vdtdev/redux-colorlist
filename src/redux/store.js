import { createStore } from 'redux';
import rootReducer from './reducers';

var appStore = null;
const allowInspector = true;

if(allowInspector){
    appStore = createStore(
        rootReducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    appStore = createStore(rootReducer);
}

export default appStore;