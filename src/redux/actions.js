import { 
    ADD_COLOR, UPDATE_COLOR, 
    SET_COLOR_NAME, SET_COLOR_VALUE, 
    DELETE_COLOR, SELECT_COLOR 
} from './actionTypes';

import Color from '../lib/color';
import { getColorById } from './selectors';

let nextColorId = 0,
    defaultColorValue = [0,0,0];

export const addColor = (name, channels = defaultColorValue) => {
    channels = Color.valToChannels(channels);
    return ({
        type: ADD_COLOR,
        payload: {
            id: ++nextColorId,
            name, channels
        }
    });
};

export const selectColor = (id) => ({
    type: SELECT_COLOR,
    payload: { id }
});

export const setColorValue = (id, channels = defaultColorValue) => {
    channels = Color.valToChannels(channels);
    return ({
        type: SET_COLOR_VALUE,
        payload: {id, channels}
    });
}

export const setColorName = (id, name) => ({
    type: SET_COLOR_NAME,
    payload: {id, name}
});

export const updateColor = (id, name, channels) => {
    if(channels){channels = Color.valToChannels(channels); }
    return ({
        type: UPDATE_COLOR,
        payload: {id, name, channels}
    })
};