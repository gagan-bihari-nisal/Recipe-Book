export const fetchRecipesSuccess = (recipes) => ({
  type: 'FETCH_RECIPES_SUCCESS',
  recipes
});

export const deleteRecipeSuccess = (recipeId) => ({
  type: 'DELETE_RECIPE_SUCCESS',
  recipeId
})

export const updateRecipeSuccess = (recipeId, updatedRecipe) => ({
  type: 'UPDATE_RECIPE_SUCCESS',
  recipeId,
  updatedRecipe
})