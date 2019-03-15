import { combineReducers } from 'redux';

import { User, LoadingStatus, Action } from '../App.dictionary';
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, MOVE_LEFT, MOVE_RIGHT } from '../actions/Actions.dictionary';

const initialLoadingStatus: LoadingStatus = {
    loading: false,
    isLoadingFailed: false
}

const moveUser = (users: User[], id: string, status: number): User[] =>
    users.map((user: User) => user.id.value === id ? { ...user, status } : user);

const loadingStatusReducer = (state: LoadingStatus = initialLoadingStatus, action: Action): LoadingStatus => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, loading: true };
        case API_CALL_SUCCESS:
            return { ...state, loading: false };
        case API_CALL_FAILURE:
            return { loading: false, isLoadingFailed: true };
        default:
            return state;
    }
};

const usersReducer = (state: User[] = [], action: Action): User[] => {
    switch (action.type) {
        case API_CALL_SUCCESS:
            return action.payload.map((user: User) => ({ ...user, status: 0 }));
        case MOVE_LEFT: {
            const { id, status }: { id: string, status: number } = action.payload;
            return moveUser(state, id, status - 1);
        }
        case MOVE_RIGHT: {
            const { id, status }: { id: string, status: number } = action.payload;
            return moveUser(state, id, status + 1);
        }
        default:
            return state;
    }
};

export default combineReducers({
    users: usersReducer,
    loadingStatus: loadingStatusReducer
});