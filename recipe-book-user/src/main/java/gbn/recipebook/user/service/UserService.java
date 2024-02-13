package gbn.recipebook.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gbn.recipebook.user.exception.InvalidInputException;
import gbn.recipebook.user.model.UserDao;
import gbn.recipebook.user.model.UserDto;
import gbn.recipebook.user.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public UserDao registerUser(UserDto user) throws InvalidInputException {
		if (userRepo.existsByUsername(user.getUsername())) {
			throw new InvalidInputException(user.getUsername() + " is already taken.");
		}
		
		UserDao userDao = new UserDao();
		userDao.setFirstName(user.getFirstName());
		userDao.setLastName(user.getLastName());
		userDao.setUsername(user.getUsername());
		userDao.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return userRepo.save(userDao);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserDao user = userRepo.findByUsername(username);
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		if (user != null) {
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
			return new User(user.getUsername(),user.getPassword(), authorities);
		} else {
			throw new UsernameNotFoundException(username + " is not found");
		}
	}
}
