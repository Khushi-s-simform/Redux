import { all, call, debounce, put, takeLeading } from 'redux-saga/effects';
import { api } from '../../api/api';
import {
  getTodoRequested,
  postTodoFailure,
  postTodoRequested,
  postTodoSucess,
  getTodoSuccessed,
  getTodoFaield,
  searchTodoRequested,
} from './todoSlice';

function* postTodoWorker(
  action: ReturnType<typeof postTodoRequested>,
): Generator {
  try {
    const res = yield call(api.post, '/todos', action.payload);

    yield put(postTodoSucess(res.data.message));
  } catch (error: any) {
    yield put(postTodoFailure(error?.response?.data?.message || error.message));
  }
}

function* getTodoWorker(): Generator {
  try {
    const res = yield call(api.get, '/todos/');
    console.log(res);
    yield put(
      getTodoSuccessed({ message: res.data.message, todos: res.data.data }),
    );
  } catch (err: any) {
    yield put(getTodoFaield(err?.response?.data?.message || err.message));
  }
}

function* searchTodoWorker(
  action: ReturnType<typeof searchTodoRequested>,
): Generator<any, void, any> {
  console.log('search fun called');

  try {
    const query = action.payload.trim();
    const endpoint = query ? `/todos/?query=${query}` : '/todos/';
    const res = yield call(api.get, endpoint);
    console.log(res);

    yield put(
      getTodoSuccessed({
        message: res.data.message,
        todos: res.data.data,
      }),
    );
  } catch (err: any) {
    yield put(getTodoFaield(err?.response?.data?.message || err.message));
  }
}

function* watchPostTodo() {
  yield takeLeading(postTodoRequested.type, postTodoWorker);
}

function* watchGetTodo() {
  yield takeLeading(getTodoRequested.type, getTodoWorker);
}

function* watchSearchTodo() {
  yield debounce(1000, searchTodoRequested.type, searchTodoWorker);
}
export default function* todoSaga() {
  yield all([watchPostTodo(), watchGetTodo(), watchSearchTodo()]);
}
