package gbn.recipebook.shoppinglist.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import gbn.recipebook.shoppinglist.model.ShoppingListDao;
import gbn.recipebook.shoppinglist.repository.ShoppingListRepository;

@Service
public class ShoppingListService {
    @Autowired
    private ShoppingListRepository shoppingListRepo;

    public List<ShoppingListDao> addIngredientsToShoppingList(List<String> ingredientNames) {
        List<ShoppingListDao> shoppingListItems = new ArrayList<>();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        for (String ingredientName : ingredientNames) {
            ShoppingListDao shoppingListItem = new ShoppingListDao();
            shoppingListItem.setUsername(username);
            shoppingListItem.setIngredientName(ingredientName);

            shoppingListItems.add(shoppingListRepo.save(shoppingListItem));
        }
        return shoppingListItems;
    }
    
    public ShoppingListDao addIngredientToShoppingList(String ingredientName) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ShoppingListDao shoppingListItem = new ShoppingListDao();
        shoppingListItem.setUsername(username);
        shoppingListItem.setIngredientName(ingredientName);
    	ShoppingListDao saved = shoppingListRepo.save(shoppingListItem);
    	return saved;
    }
    
    public List<ShoppingListDao> getAllIngredients() {
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	List<ShoppingListDao> ingredients = shoppingListRepo.findAllByUsername(username);
    	return ingredients;
    }
    
    
    public ShoppingListDao getIngredientById(Long shoppingListId) {
    	return shoppingListRepo.findById(shoppingListId).orElse(null);
    }
    
    public String deleteById(Long shoppingListId) {
    	 shoppingListRepo.deleteById(shoppingListId);
    	 return "Deleted successfully";
    }

    public Boolean checkExistsById(Long id) {
    	if (shoppingListRepo.findById(id) != null) {
    		return true;
    	}
    	return false;
    }
}
