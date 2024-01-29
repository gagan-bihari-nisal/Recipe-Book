package gbn.recipebook.recipe.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class RecipeDto {
	@NotBlank(message = "Recipe name cannot be left empty.")
	@Size(min = 3, max = 50, message = "Recipe name should be in range of 3 and 50.")
	private String name;
	@NotBlank(message = "Recipe Description cannot be left empty.")
	@Size(min = 3, max = 50, message = "Recipe Description should be in range of 3 and 50.")
	private String description;
	private MultipartFile imageFile;
	private List<String> ingredients = new ArrayList<>();
	private List<String> steps = new ArrayList<>();
} 
