import { combineReducers } from 'redux';
import authReducer from './Auth/AuthReducers.js';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import recipeReducer from './Recipes/RecipeReducers.js';
import shoppingListReducer from './ShoppingList/ShoppingListReducers.js';

const rootReducer = combineReducers({
  auth: authReducer,
  recipes : recipeReducer,
  shoppingList : shoppingListReducer,
})

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);     