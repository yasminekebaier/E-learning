import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import RessourcesReducer from './slices/RessourceSlice.js'
import matiereReducer from './slices/MatiéreSlice.js'
import coursReducer from './slices/CoursSlice.js'
import {persistReducer} from 'redux-persist'
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quizDevoirReducer from "./slices/QuizSlice.js";
import visioConferencesReducer from "./slices/VisioSlice.js";
import MessagesReducer from "./slices/ChatSlice.js";
const rootReducer = combineReducers({
    user:userReducer,
    ressources:RessourcesReducer,
    matiere:matiereReducer,
    cours:coursReducer,
    quizDevoir:quizDevoirReducer,
    visioConferences:visioConferencesReducer,
    Messages:MessagesReducer
});
const persistConfig={
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);