package gbn.recipebook.recipe.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import gbn.recipebook.recipe.model.Ingredient;
import gbn.recipebook.recipe.model.RecipeDao;
import gbn.recipebook.recipe.model.RecipeDto;
import gbn.recipebook.recipe.model.ShoppingListDao;
import gbn.recipebook.recipe.model.Steps;
import gbn.recipebook.recipe.repository.IngredientRepository;
import gbn.recipebook.recipe.repository.RecipeRepository;

@Service
public class RecipeService {

	@Autowired
	RecipeRepository recipeRepo;

	@Autowired
	IngredientRepository ingredientRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	@Autowired
	private ShoppingListClient shoppingListClient;

	public RecipeDao addRecipe(RecipeDto recipeDto) throws IOException {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		MultipartFile file = recipeDto.getImageFile();

		RecipeDao recipeDAO = new RecipeDao();
		recipeDAO.setUsername(username);
		recipeDAO.setName(recipeDto.getName());
		recipeDAO.setDescription(recipeDto.getDescription());

		List<Steps> stepsList = recipeDto.getSteps().stream().map(stepName -> {
			Steps step = new Steps();
			step.setRecipe(recipeDAO);
			step.setStep(stepName);
			return step;
		}).collect(Collectors.toList());

		List<Ingredient> ingredientList = recipeDto.getIngredients().stream().map(ingredientName -> {
			Ingredient ingredient = new Ingredient();
			ingredient.setIngredientName(ingredientName);
			ingredient.setRecipe(recipeDAO);
			return ingredient;
		}).collect(Collectors.toList());

		recipeDAO.setIngredients(ingredientList);
		recipeDAO.setSteps(stepsList);
		RecipeDao savedRecipe = recipeRepo.save(recipeDAO);

		Path directoryPath = Paths.get(uploadDirectory, "images", username);
		Files.createDirectories(directoryPath);
		Path filePath = Paths.get(uploadDirectory, "images", username, savedRecipe.getId() + ".jpg");
		file.transferTo(filePath.toFile());

		recipeDAO.setImage(filePath.toString());

		return recipeRepo.save(recipeDAO);
	}

	public boolean checkRecipeExists(Long recipeId) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return recipeRepo.existsByIdAndUsername(recipeId, username);
	}

	public RecipeDao getRecipe(Long recipeId) {

		if (!checkRecipeExists(recipeId)) {
			return null;
		}

		return recipeRepo.findById(recipeId).orElse(null);
	}

	public List<RecipeDao> getAllRecipes() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return recipeRepo.findByUsername(username);
	}

	public List<Ingredient> getIngredientsById(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		return recipeRepo.findAllIngredientsByRecipeId(recipeId);
	}

	public List<Steps> getStepsById(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		return recipeRepo.findAllStepsByRecipeId(recipeId);
	}

	public ShoppingListDao addToShoppingListByIngredientId(Long ingredientId) {
		Ingredient ingredient = ingredientRepo.findById(ingredientId).orElse(null);
		if (ingredient == null)
			return null;
		return shoppingListClient.addIngredientToShoppingList(ingredient.getIngredientName()).getBody();
	}
	
	public List<ShoppingListDao> addToShoppingListByRecipeId(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		List<String> ingredients = recipeRepo.findAllIngredientsByRecipeId(recipeId)
				.stream()
				.map( i -> i.getIngredientName())
				.collect(Collectors.toList());
		if (ingredients.isEmpty()) return null;
		
		return shoppingListClient.addIngredientsToShoppingList(ingredients).getBody();
	}
}
