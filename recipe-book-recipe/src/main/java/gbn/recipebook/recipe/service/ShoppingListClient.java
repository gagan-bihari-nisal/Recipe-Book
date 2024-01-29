package gbn.recipebook.recipe.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import gbn.recipebook.recipe.model.IngredientDto;
import gbn.recipebook.recipe.model.ShoppingListDao;

@FeignClient(name = "shopping")
public interface ShoppingListClient {
	@PostMapping("/addIngredient")
	public ResponseEntity<ShoppingListDao> addIngredientToShoppingList(
			@RequestBody String ingredientName);

	@PostMapping("/addIngredients")
	public ResponseEntity<List<ShoppingListDao>> addIngredientsToShoppingList(
			@RequestBody List<String> ingredientNames);
	
	
}

