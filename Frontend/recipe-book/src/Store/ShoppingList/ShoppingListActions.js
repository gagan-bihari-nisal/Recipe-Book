export const fetchIngredientsSuccess = (ingredients) => ({
    type: 'FETCH_INGREDIENTS_SUCCESS',
    ingredients
  });
  
  export const deleteIngredientSuccess = (id) => ({
    type: 'DELETE_INGREDIENT_SUCCESS',
    id
  })
  
  export const updateIngredientSuccess = (id, updatedIngredient) => ({
    type: 'UPDATE_INGREDIENT_SUCCESS',
    id,
    updatedIngredient
  })
  
  export const addIngredientSuccess = (newIngredient)=>({
    type:'ADD_INGREDIENT_SUCCESS',
    newIngredient
  })