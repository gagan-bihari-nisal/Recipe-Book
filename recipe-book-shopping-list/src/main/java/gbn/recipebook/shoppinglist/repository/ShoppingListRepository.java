package gbn.recipebook.shoppinglist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gbn.recipebook.shoppinglist.model.ShoppingListDao;
@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingListDao, Long> {

	List<ShoppingListDao> findAllByUsername(String username);

}
