package gbn.recipebook.shoppinglist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.shoppinglist.exception.InvalidInputException;
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
	public ResponseEntity<ShoppingListDao> addIngredientToShoppingList(@RequestBody String ingredientName) {
		return ResponseEntity.ok(shoppingListService.addIngredientToShoppingList(ingredientName));
	}

	@GetMapping
	public ResponseEntity<List<ShoppingListDao>> getAllIngredients() {
		return ResponseEntity.ok(shoppingListService.getAllIngredients());
	}

	@GetMapping("/{shoppingListId}")
	public ResponseEntity<ShoppingListDao> getIngredientById(@PathVariable("shoppingListId") Long shoppingListId)
			throws InvalidInputException {
		if (!shoppingListService.checkExistsById(shoppingListId)) {
			throw new InvalidInputException(shoppingListId + " does not exists");
		}
		return ResponseEntity.ok(shoppingListService.getIngredientById(shoppingListId));
	}

	@PutMapping("/{shoppingListId}")
	public ResponseEntity<ShoppingListDao> updateIngredient(@PathVariable("shoppingListId") Long shoppingListId,
			@RequestBody String ingredientName) throws InvalidInputException {
		if (!shoppingListService.checkExistsById(shoppingListId)) {
			throw new InvalidInputException(shoppingListId + " does not exists");
		}
		return ResponseEntity.ok(shoppingListService.addIngredientToShoppingList(ingredientName));
	}

	@DeleteMapping("/{shoppingListId}")
	public ResponseEntity<String> updateIngredient(@PathVariable("shoppingListId") Long shoppingListId)
			throws InvalidInputException {
		if (!shoppingListService.checkExistsById(shoppingListId)) {
			throw new InvalidInputException(shoppingListId + " does not exists");
		}
		return ResponseEntity.ok(shoppingListService.deleteById(shoppingListId));
	}

}
