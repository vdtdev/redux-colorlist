import { 
    ADD_COLOR, UPDATE_COLOR, 
    SET_COLOR_NAME, SET_COLOR_VALUE, 
    DELETE_COLOR, SELECT_COLOR 
} from '../actionTypes';
// import { getColorById } from '../selectors';

const initialState = {
    allIds: [],
    byIds: {},
    selectedId: null
};

const writeToLocal = (state) => {
    window.localStorage.setItem('colors',JSON.stringify({colors: state}));
};

function colorsReducer(state = initialState, action) {
    switch(action.type){
        case DELETE_COLOR: {
            const {id} = action.payload;
            let byIds = state.byIds;
            delete byIds[id];
            let s = {
                ...state,
                allIds: state.allIds.filter(v=> (v !== id)),
                byIds: byIds,
                selectedId: null
            };
            writeToLocal(s);
            return s;
        }
        case SELECT_COLOR: {
            const {id} = action.payload;
            let s = {
                ...state,
                selectedId: id
            };
            writeToLocal(s);
            return s;
        }
        case ADD_COLOR: {
            const {name, channels} = action.payload;
            const id = (state.allIds.includes(action.payload.id))? Math.max.apply(null, state.allIds) + 1 : action.payload.id;
            let s = {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        name,
                        channels
                    }
                },
                selectedId: id
            };
            writeToLocal(s);
            return s;
        }
        case SET_COLOR_NAME: {
            const {id, name} = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        name: name
                    }
                }
            };
        }
        case SET_COLOR_VALUE: {
            const {id, channels} = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        channels
                    }
                }
            };
        }
        case UPDATE_COLOR: {
            const {id, name, channels} = action.payload;
            let updates = {};
            if(name){updates.name = name;}
            if(channels){updates.channels = channels;}
            let s = {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        ...updates
                    }
                }
            };
            writeToLocal(s);
            return s;
        }
        default: 
            return state;
    }
}

export default colorsReducer;