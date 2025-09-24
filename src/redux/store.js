import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice.js';
import RessourcesReducer from './slices/RessourceSlice.js';
import matiereReducer from './slices/MatiéreSlice.js';
import coursReducer from './slices/CoursSlice.js';
import quizDevoirReducer from "./slices/QuizSlice.js";
import visioConferencesReducer from "./slices/VisioSlice.js";
import MessagesReducer from "./slices/ChatSlice.js";
import feedbackReducer from './slices/feedbackSlice.js';
import specialityReducer from './slices/SpecialitySlice.js';
import notificationsReducer from './slices/NotificationSlice.js';
import reclamationReducer from './slices/reclamationSlice.js';
const appReducer = combineReducers({
    user: userReducer,
    ressources: RessourcesReducer,
    matiere: matiereReducer,
    cours: coursReducer,
    quizDevoir: quizDevoirReducer,
    visioConferences: visioConferencesReducer,
    Messages: MessagesReducer,
    feedback:feedbackReducer,
   speciality:specialityReducer,
   notifications:notificationsReducer,
   reclamations:reclamationReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined; // réinitialise tout le store
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
