package gbn.recipebook.recipe.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
public class ShoppingListDao {

	private Long id;

	private String username;

	private String ingredientName;

}