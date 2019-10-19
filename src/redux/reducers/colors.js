import { 
    ADD_COLOR, UPDATE_COLOR, 
    SET_COLOR_NAME, SET_COLOR_VALUE, 
    DELETE_COLOR, SELECT_COLOR 
} from '../actionTypes';

const initialState = {
    allIds: [],
    byIds: {},
    selectedId: null
};

function colorsReducer(state = initialState, action) {
    switch(action.type){
        case SELECT_COLOR: {
            const {id} = action.payload;
            return {
                ...state,
                selectedId: id
            };
        }
        case ADD_COLOR: {
            const {id, name, channels} = action.payload;
            return {
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
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        ...updates
                    }
                }
            };
        }
        default: 
            return state;
    }
}

export default colorsReducer;