import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const initialState = {
    recipes: []
};

const recipesPersistConfig = {
    key: 'recipes',
    storage: storage,
    whitelist: ['recipes'],
};
const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            return {
                ...state,
                recipes: action.recipes
            };
        case 'DELETE_RECIPE_SUCCESS':
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId)
            }
        case 'UPDATE_RECIPE_SUCCESS':
            const { recipeId, updatedRecipe } = action;
            const recipes = {
                ...state,
                recipes: state.recipes.map(recipe => {
                    if (recipe.id === parseInt(recipeId)) {
                        return {
                            ...recipe,
                            ...updatedRecipe
                        };
                    }
                    return recipe;
                })
            };
            return recipes;
        case 'ADD_RECIPE_SUCCESS':
            return {
                ...state,
                recipes: [...state.recipes, action.newRecipe]
            }
        default:
            return state;
    }
};


export default persistReducer(recipesPersistConfig, recipeReducer);
