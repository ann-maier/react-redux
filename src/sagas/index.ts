import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST_URL, API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../App.dictionary';

const getUsers = () => axios.get(REQUEST_URL);

export function* watcherSaga() {
    yield takeLatest(API_CALL_REQUEST, workerSaga);
}

function* workerSaga() {
    try {
        const response = yield call(getUsers);
        yield put({ type: API_CALL_SUCCESS, payload: response.data.results });
    } catch (error) {
        yield put({ type: API_CALL_FAILURE });
    }
}