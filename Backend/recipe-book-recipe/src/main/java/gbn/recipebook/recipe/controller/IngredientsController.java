package gbn.recipebook.recipe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.recipe.exception.InvalidInputException;
import gbn.recipebook.recipe.model.Ingredient;
import gbn.recipebook.recipe.model.ShoppingListDao;
import gbn.recipebook.recipe.service.RecipeService;

@RestController
public class IngredientsController {
	
	@Autowired
	RecipeService recipeService;

	// Add single ingredient to shopping list using ingredient id
	@PostMapping("/ingredient/addToShopping/{id}")
	ResponseEntity<ShoppingListDao> addToShoppingListByIngredientId(@PathVariable("id") Long ingredientId)
			throws InvalidInputException {
		if (!recipeService.checkIngredientExists(ingredientId)) {
			throw new InvalidInputException(ingredientId + " does not exists.");
		}
		return ResponseEntity.ok(recipeService.addIngredientToShoppingListByIngredientId(ingredientId));
	}

	// Add list of ingredients to shopping list using recipeId
	@PostMapping("/ingredients/addToShopping/{recipeId}")
	ResponseEntity<List<ShoppingListDao>> addToShoppingListByRecipeId(@PathVariable("recipeId") Long recipeId)
			throws InvalidInputException {
		if (!recipeService.checkRecipeExists(recipeId)) {
			throw new InvalidInputException(recipeId + " does not exists.");
		}
		return ResponseEntity.ok(recipeService.addIngredientsToShoppingListByRecipeId(recipeId));
	}

	// get ingredients by recipeId
	@GetMapping("/ingredients/{id}")
	ResponseEntity<List<Ingredient>> getIngredientsById(@PathVariable("id") Long recipeId)
			throws InvalidInputException {
		if (!recipeService.checkRecipeExists(recipeId)) {
			throw new InvalidInputException(recipeId + " does not exists.");
		}
		return ResponseEntity.ok(recipeService.getIngredientsById(recipeId));
	}

}
