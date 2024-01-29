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

}
