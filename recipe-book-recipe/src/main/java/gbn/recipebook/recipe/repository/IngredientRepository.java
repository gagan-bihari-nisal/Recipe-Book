package gbn.recipebook.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gbn.recipebook.recipe.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

}
