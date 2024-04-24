package gbn.recipebook.recipe.service;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import gbn.recipebook.recipe.exception.InvalidInputException;
import gbn.recipebook.recipe.model.Ingredient;
import gbn.recipebook.recipe.model.RecipeDao;
import gbn.recipebook.recipe.model.RecipeDto;
import gbn.recipebook.recipe.model.ShoppingListDao;
import gbn.recipebook.recipe.model.Steps;
import gbn.recipebook.recipe.repository.IngredientRepository;
import gbn.recipebook.recipe.repository.RecipeRepository;
import com.google.firebase.cloud.StorageClient;

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

	public RecipeDao addRecipe(RecipeDto recipeDto) throws InvalidInputException {

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

		try {
			// Get the Firebase Storage bucket
			Bucket bucket = StorageClient.getInstance().bucket();

			// Define the metadata for the file
			BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), "images/" + username + "/" + savedRecipe.getId() + "_" + file.getOriginalFilename())
					.setContentType(file.getContentType()).build();

			// Upload the file to Firebase Storage
			bucket.create(blobInfo.getName(), file.getInputStream(), blobInfo.getContentType());

			// Set the image URL in the recipe
			String imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.getName() + "/o/" + URLEncoder.encode(blobInfo.getName(), StandardCharsets.UTF_8.name()) + "?alt=media";
			System.out.println("Image URL: " + imageUrl);
			recipeDAO.setImage(imageUrl);
		} catch (IOException ex) {
			throw new InvalidInputException("Invalid Image File");
		}

//		try {
//			Path directoryPath = Paths.get(uploadDirectory, "images", username);
//			Files.createDirectories(directoryPath);
//			Path filePath = Paths.get(uploadDirectory, "images", username, savedRecipe.getId()+"_"+file.getOriginalFilename() + ".jpg");
//			file.transferTo(filePath.toFile());
//			recipeDAO.setImage(filePath.toString());
//		} catch (IOException ex) {
//			throw new InvalidInputException("Invalid Image File");
//		}

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

	public List<RecipeDao> getOtherRecipes() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<RecipeDao> recipes = recipeRepo.findAll().stream()
				.filter(recipe -> !recipe.getUsername().equals(username))
				.collect(Collectors.toList());
		return recipes;
	}

	public Map<String, String> deleteByRecipeId(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return Collections.singletonMap("message", recipeId + " does not exists.");
		}
		recipeRepo.deleteById(recipeId);
		return Collections.singletonMap("message", "recipe with recipeId = " + recipeId + " is deleted.");
	}

	public List<Ingredient> getIngredientsById(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		return recipeRepo.findAllIngredientsByRecipeId(recipeId);
	}

	public boolean checkIngredientExists(Long ingredientId) {
		if (ingredientRepo.findById(ingredientId) != null) {
			return true;
		}
		return false;
	}

	public ShoppingListDao addIngredientToShoppingListByIngredientId(Long ingredientId) {
		Ingredient ingredient = ingredientRepo.findById(ingredientId).orElse(null);
		if (ingredient == null)
			return null;
		return shoppingListClient.addIngredientToShoppingList(ingredient.getIngredientName()).getBody();
	}

	public List<ShoppingListDao> addIngredientsToShoppingListByRecipeId(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		List<String> ingredients = recipeRepo.findAllIngredientsByRecipeId(recipeId).stream()
				.map(i -> i.getIngredientName()).collect(Collectors.toList());
		if (ingredients.isEmpty())
			return null;

		return shoppingListClient.addIngredientsToShoppingList(ingredients).getBody();
	}

	public List<Steps> getStepsById(Long recipeId) {
		if (!checkRecipeExists(recipeId)) {
			return null;
		}
		return recipeRepo.findAllStepsByRecipeId(recipeId);
	}

	public RecipeDao updateRecipe(RecipeDto recipeDto, Long recipeId) throws InvalidInputException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		RecipeDao existingRecipe = recipeRepo.findById(recipeId)
				.orElseThrow(() -> new InvalidInputException(recipeId + " does not exists."));

		existingRecipe.setUsername(username);
		existingRecipe.setName(recipeDto.getName());
		existingRecipe.setDescription(recipeDto.getDescription());

		updateIngredients(existingRecipe, recipeDto.getIngredients());
		updateSteps(existingRecipe, recipeDto.getSteps());

		if(recipeDto.getImageFile()!=null) {
			MultipartFile file = recipeDto.getImageFile();
			try {
				// Get the Firebase Storage bucket
				Bucket bucket = StorageClient.getInstance().bucket();
				// Get the old image URL and extract the blob name
				String oldImageUrl = existingRecipe.getImage();
				String oldImageBlobName = oldImageUrl.substring(oldImageUrl.indexOf("/o/") + 3, oldImageUrl.indexOf("?alt=media"));
				oldImageBlobName = URLDecoder.decode(oldImageBlobName, StandardCharsets.UTF_8.name());

				// Delete the old image from Firebase Storage
				boolean deleted = bucket.get(oldImageBlobName).delete();
				if (!deleted) {
					throw new IOException("Failed to delete old image");
				} else {
					System.out.println("Deleted old image");
				}

				// Define the metadata for the file
				BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), "images/" + username + "/" + existingRecipe.getId() + "_" + file.getOriginalFilename())
						.setContentType(file.getContentType()).build();

				// Upload the file to Firebase Storage
				bucket.create(blobInfo.getName(), file.getInputStream(), blobInfo.getContentType());

				// Set the image URL in the recipe
				String imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.getName() + "/o/" + URLEncoder.encode(blobInfo.getName(), StandardCharsets.UTF_8.name()) + "?alt=media";
				System.out.println("Image URL: " + imageUrl);
				existingRecipe.setImage(imageUrl);
			} catch (IOException ex) {
				throw new InvalidInputException("Invalid Image File");
			}
//			try {
//				Path directoryPath = Paths.get(uploadDirectory, "images", username);
//				Files.createDirectories(directoryPath);
//				Path filePath = Paths.get(uploadDirectory, "images", username, recipeId+"_"+file.getOriginalFilename() + ".jpg");
//				file.transferTo(filePath.toFile());
//				existingRecipe.setImage(filePath.toString());
//			} catch (IOException ex) {
//				throw new InvalidInputException("Invalid Image File");
//			}
		}

		return recipeRepo.save(existingRecipe);
	}

	private void updateIngredients(RecipeDao recipe, List<String> updatedIngredients) {
		recipe.getIngredients().clear();
		for (String ingredientName : updatedIngredients) {
			Ingredient ingredient = new Ingredient();
			ingredient.setIngredientName(ingredientName);
			ingredient.setRecipe(recipe);
			recipe.getIngredients().add(ingredient);
		}
	}

	private void updateSteps(RecipeDao recipe, List<String> updatedSteps) {
		recipe.getSteps().clear();
		for (String stepName : updatedSteps) {
			Steps step = new Steps();
			step.setStep(stepName);
			step.setRecipe(recipe);
			recipe.getSteps().add(step);
		}
	}
}
