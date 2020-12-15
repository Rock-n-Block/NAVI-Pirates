const initialState = {
    type: '',
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'WALLET:SET_TYPE':
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}