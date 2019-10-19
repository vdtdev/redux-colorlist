export const getColorsState = store => store.colors;

export const getColorList = store =>
    getColorsState(store) ? getColorsState(store).allIds : [];

export const getColorById = (store, id) => {
    let state = getColorsState(store);
    if(state){
        return { ...state.byIds[id], id };
    } else {
        return {};
    }
};

export const getColors = store => getColorList(store).map(id => getColorById(store, id));

export const getSelectedColor = store => {
    let state = getColorsState(store);
    if(state && state.selectedId){
        console.info('Has selected ID', state.selectedId);
        return getColorById(store, state.selectedId);
    } else {
        return {};
    }
}