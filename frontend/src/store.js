import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import profileReducer from './reducers/profileReducer';
import postReducer from './reducers/postReducer';

const rootReducer = combineReducers({
    User: userReducer,
    Profile: profileReducer,
    Post: postReducer
})

const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
  User: {
    user: userFromStorage
  }
}

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store