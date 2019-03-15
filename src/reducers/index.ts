import { combineReducers } from 'redux';

import { User, Action } from '../App.dictionary';
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, MOVE_LEFT, MOVE_RIGHT } from '../actions/Actions.dictionary';

const moveUser = (users: User[], id: string, status: number): User[] =>
    users.map((user: User) => user.id.value === id ? { ...user, status } : user);

const loadingReducer = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return true;
        case API_CALL_SUCCESS:
            return false;
        case API_CALL_FAILURE:
            return false;
        default:
            return state;
    }
}

const isLoadingFailedReducer = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case API_CALL_FAILURE:
            return true;
        default:
            return state;
    }
}

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
    loading: loadingReducer,
    isLoadingFailed: isLoadingFailedReducer
});