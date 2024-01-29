package gbn.recipebook.shoppinglist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.shoppinglist.model.ShoppingListDao;
import gbn.recipebook.shoppinglist.service.ShoppingListService;

@RestController
public class ShoppingListController {

	@Autowired
	private ShoppingListService shoppingListService;

	@PostMapping("/addIngredients")
	public ResponseEntity<List<ShoppingListDao>> addIngredientsToShoppingList(
			@RequestBody List<String> ingredientNames) {
		List<ShoppingListDao> shoppingListItems = shoppingListService.addIngredientsToShoppingList(ingredientNames);
	    return ResponseEntity.ok(shoppingListItems);
	}

	@PostMapping("/addIngredient")
	public ResponseEntity<ShoppingListDao> addIngredientToShoppingList(
			@RequestBody String ingredientName) {
		return ResponseEntity.ok(shoppingListService.addIngredientToShoppingList(ingredientName));
	}

}
