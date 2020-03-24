import { createStore } from 'redux';
import rootReducer from './reducers';

var appStore = null;
const allowInspector = false;

/**
 * load from local storage 'colors'
 */
const loadState = () => {
    const savedState = window.localStorage.getItem('colors');
    if(savedState === null){
        return undefined;
    } else {
        return JSON.parse(savedState);
    }
};

if(allowInspector){
    appStore = createStore(
        rootReducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    appStore = createStore(rootReducer, loadState());
}

export default appStore;