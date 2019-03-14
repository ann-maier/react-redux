import { User, Store, Action } from '../App.dictionary';
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE, MOVE_LEFT, MOVE_RIGHT } from '../actions/Actions.dictionary';

const initialState: Store = {
    users: [],
    loading: false,
    isLoadingFailed: false
};

const moveUser = (users: User[], id: string, status: number): User[] =>
    users.map((user: User) => user.id.value === id ? { ...user, status } : user);

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, loading: true };
        case API_CALL_SUCCESS:
            const users: User[] = action.payload.map((user: User) => ({ ...user, status: 0 }));
            return { ...state, users, loading: false };
        case API_CALL_FAILURE:
            return { ...state, loading: false, isLoadingFailed: true };
        case MOVE_LEFT: {
            const { id, status }: { id: string, status: number } = action.payload;
            const users: User[] = moveUser(state.users, id, status - 1);
            return { ...state, users };
        }
        case MOVE_RIGHT: {
            const { id, status }: { id: string, status: number } = action.payload;
            const users: User[] = moveUser(state.users, id, status + 1);
            return { ...state, users };
        }
        default:
            return state;
    }
};

export default reducer;