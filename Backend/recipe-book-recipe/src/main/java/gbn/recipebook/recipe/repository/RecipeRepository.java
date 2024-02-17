package gbn.recipebook.recipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import gbn.recipebook.recipe.model.Ingredient;
import gbn.recipebook.recipe.model.RecipeDao;
import gbn.recipebook.recipe.model.Steps;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeDao, Long> {
	public boolean existsByIdAndUsername(Long id, String username);
	public List<RecipeDao> findByUsername(String username); 
	@Query("SELECT r.ingredients FROM RecipeDao r WHERE r.id = :recipeId")
	public List<Ingredient> findAllIngredientsByRecipeId(@Param("recipeId") Long recipeId);
	@Query("SELECT r.steps FROM RecipeDao r WHERE r.id = ?1")
	public List<Steps> findAllStepsByRecipeId(Long recipeId);
}
