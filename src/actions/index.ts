import { Action } from '../App.dictionary';
import { API_CALL_REQUEST, MOVE_LEFT, MOVE_RIGHT } from './Actions.dictionary';

const fetchData = () => ({
    type: API_CALL_REQUEST
});

const moveLeft = (id: string, status: number): Action => ({
    type: MOVE_LEFT,
    payload: { id, status }
});

const moveRight = (id: string, status: number): Action => ({
    type: MOVE_RIGHT,
    payload: { id, status }
});

export {
    fetchData,
    moveLeft,
    moveRight
};