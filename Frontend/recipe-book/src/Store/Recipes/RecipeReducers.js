const initialState = {
    recipes: [],
}

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.recipes
            }
        default:
            return state
    }
}

export default recipeReducer