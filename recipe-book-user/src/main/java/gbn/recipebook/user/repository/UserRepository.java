package gbn.recipebook.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gbn.recipebook.user.model.UserDao;

@Repository
public interface UserRepository extends JpaRepository<UserDao, Long> {
	public UserDao findByUsername(String username);
	public boolean existsByUsername(String username);
}
