package gbn.recipebook.recipe.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.recipe.model.Ingredient;
import gbn.recipebook.recipe.model.IngredientDto;
import gbn.recipebook.recipe.model.RecipeDao;
import gbn.recipebook.recipe.model.RecipeDto;
import gbn.recipebook.recipe.model.ShoppingListDao;
import gbn.recipebook.recipe.model.Steps;
import gbn.recipebook.recipe.service.RecipeService;
import gbn.recipebook.recipe.service.ShoppingListClient;

@RestController
public class RecipeController {

	@Autowired
	RecipeService recipeService;

	@PostMapping("/addRecipe")
	ResponseEntity<RecipeDao> addRecipe(@ModelAttribute @Valid RecipeDto recipe, BindingResult bindingResults)
			throws Exception {
		if (bindingResults.hasErrors()) {
			throw new Exception(bindingResults.getAllErrors().stream().map(e -> e.getDefaultMessage())
					.reduce((e1, e2) -> e1 + " " + e2).orElse(""));
		}
		return ResponseEntity.ok(recipeService.addRecipe(recipe));
	}

	@GetMapping("/checkExists/{id}")
	ResponseEntity<Boolean> checkExists(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.checkRecipeExists(recipeId));
	}

	@GetMapping("/{id}")
	ResponseEntity<RecipeDao> getRecipe(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.getRecipe(recipeId));
	}

	@GetMapping("/getAllRecipes")
	ResponseEntity<List<RecipeDao>> getAllRecipes() {
		return ResponseEntity.ok(recipeService.getAllRecipes());
	}

	@GetMapping("/ingredients/{id}")
	ResponseEntity<List<Ingredient>> getIngredientsById(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.getIngredientsById(recipeId));
	}

	@PostMapping("/ingredient/addToShopping/{id}")
	ResponseEntity<ShoppingListDao> addToShoppingListByIngredientId(@PathVariable("id") Long ingredientId) {
		return ResponseEntity.ok(recipeService.addToShoppingListByIngredientId(ingredientId));
	}
	
	@PostMapping("/ingredients/addToShopping/{recipeId}")
	ResponseEntity<List<ShoppingListDao>> addToShoppingListByRecipeId(@PathVariable("recipeId") Long recipeId) {
		return ResponseEntity.ok(recipeService.addToShoppingListByRecipeId(recipeId));
	}

	@GetMapping("/steps/{id}")
	ResponseEntity<List<Steps>> getStepsById(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.getStepsById(recipeId));
	}

}
