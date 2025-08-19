const initialState = {
    marketName: null,
};

const marketReducer = (state = initialState, action:any) => {
    if (action.type == 'market/login'){
        return{ ...state, marketName: 10}
    }

    return state;

}

export default marketReducer;