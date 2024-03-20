import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const initialState = {
    ingredients: []
}

const shoppingListPersistConfig = {
    key: 'shoppingList',
    storage: storage,
    whiteList: ['ingredients']
}

const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_INGREDIENTS_SUCCESS':
            const newIngredients = {
                ...state, ingredients: action.ingredients
            }
            return newIngredients;
        case 'DELETE_INGREDIENT_SUCCESS':
            return {
                ...state,
                ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.id)
            }
        case 'UPDATE_INGREDIENT_SUCCESS':
            const { id, updatedIngredient } = action;
            const ingredients = {
                ...state,
                ingredients: state.ingredients.map(ingredient => {
                    if (ingredient.id === parseInt(id)) {
                        return {
                            ...ingredient,
                            ...updatedIngredient
                        };
                    }
                    return ingredient;
                })
            };
            console.log(ingredients)
            return ingredients;
        case 'ADD_INGREDIENT_SUCCESS':
            return {
                ...state,
                ingredients: [...state.ingredients, action.newIngredient]
            }
        default:
            return state;
    }

}

export default persistReducer(shoppingListPersistConfig, shoppingListReducer);