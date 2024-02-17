package gbn.recipebook.recipe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.recipe.model.Steps;
import gbn.recipebook.recipe.service.RecipeService;

@RestController
public class StepsController {

	@Autowired
	RecipeService recipeService;

	@GetMapping("/steps/{id}")
	ResponseEntity<List<Steps>> getStepsById(@PathVariable("id") Long recipeId) {
		return ResponseEntity.ok(recipeService.getStepsById(recipeId));
	}
}
