import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, Store, Action } from '../App.dictionary';

const initialState: Store = {
    users: [],
    isLoadingFailed: false
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, isLoadingFailed: false };
        case API_CALL_SUCCESS:
            return { ...state, isLoadingFailed: false, users: action.payload }
        case API_CALL_FAILURE:
            return { ...state, isLoadingFailed: true };
        default:
            return state;
    }
};

export default reducer;