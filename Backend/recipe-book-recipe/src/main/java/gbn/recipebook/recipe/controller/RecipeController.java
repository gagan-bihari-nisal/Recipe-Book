package gbn.recipebook.recipe.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.recipe.exception.InvalidInputException;
import gbn.recipebook.recipe.model.RecipeDao;
import gbn.recipebook.recipe.model.RecipeDto;
import gbn.recipebook.recipe.service.RecipeService;

@RestController
public class RecipeController {

	@Autowired
	RecipeService recipeService;

	// CRUD operations for recipe
	// create recipe
	@PostMapping("/addRecipe")
	ResponseEntity<RecipeDao> addRecipe(@ModelAttribute @Valid RecipeDto recipe, BindingResult bindingResults)
			throws InvalidInputException {
		if (bindingResults.hasErrors()) {
			throw new InvalidInputException(bindingResults.getAllErrors().stream().map(e -> e.getDefaultMessage())
					.reduce((e1, e2) -> e1 + " " + e2).orElse(""));
		}
		return ResponseEntity.ok(recipeService.addRecipe(recipe));
	}

	// retrieve recipe by recipe id
	@GetMapping("/{id}")
	ResponseEntity<?> getRecipe(@PathVariable("id") Long recipeId) throws InvalidInputException {
		if (!recipeService.checkRecipeExists(recipeId)) {
			throw new InvalidInputException(recipeId + " does not exists.");
		}
		RecipeDao recipe = recipeService.getRecipe(recipeId);
		return ResponseEntity.ok(recipe);
	}

	// get all recipes added by user
	@GetMapping("/getAllRecipes")
	ResponseEntity<List<RecipeDao>> getAllRecipes() {
		return ResponseEntity.ok(recipeService.getAllRecipes());
	}

//	get all recipes from the database except those added by the user
	@GetMapping("/getOtherRecipes")
	ResponseEntity<List<RecipeDao>> getOtherRecipes() {
		return ResponseEntity.ok(recipeService.getOtherRecipes());
	}
	// update a recipe by recipe id
	@PutMapping("/{id}")
	ResponseEntity<RecipeDao> updateRecipe(@PathVariable("id") Long recipeId, @ModelAttribute RecipeDto recipeDto,
			BindingResult bindingResults) throws InvalidInputException {
		if (bindingResults.hasErrors()) {
			throw new InvalidInputException(bindingResults.getAllErrors().stream().map(e -> e.getDefaultMessage())
					.reduce((e1, e2) -> e1 + " " + e2).orElse(""));
		}
		if (!recipeService.checkRecipeExists(recipeId)) {
			throw new InvalidInputException(recipeId + " does not exists.");
		}
		return ResponseEntity.ok(recipeService.updateRecipe(recipeDto, recipeId));
	}

	// delete by recipe id
	@DeleteMapping("/{id}")
	ResponseEntity<Map<String, String>> deleteByRecipeId(@PathVariable("id") Long recipeId)
			throws InvalidInputException {
		if (!recipeService.checkRecipeExists(recipeId)) {
			throw new InvalidInputException(recipeId + " does not exists.");
		}
		return ResponseEntity.ok(recipeService.deleteByRecipeId(recipeId));
	}

	// check whether a recipe id exists or not
	@GetMapping("/checkExists/{id}")
	ResponseEntity<Boolean> checkExists(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.checkRecipeExists(recipeId));
	}
}
