package gbn.recipebook.user.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gbn.recipebook.user.exception.InvalidInputException;
import gbn.recipebook.user.filter.TokenGeneratorFilter;
import gbn.recipebook.user.model.JwtRequest;
import gbn.recipebook.user.model.JwtResponse;
import gbn.recipebook.user.model.UserDao;
import gbn.recipebook.user.model.UserDto;
import gbn.recipebook.user.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	TokenGeneratorFilter tokenGenerator;
	
	@Autowired
	AuthenticationManager authentication;
	
	@PostMapping("/register")
	ResponseEntity<UserDao> registerUser(@Valid @RequestBody UserDto user, BindingResult bindingResults) throws InvalidInputException {

		if (bindingResults.hasErrors()) {
			throw new InvalidInputException(bindingResults.getAllErrors()
					.stream()
					.map(e -> e.getDefaultMessage())
					.reduce((e1,e2) -> e1 +" "+ e2).orElse(""));
		}
		
		return ResponseEntity.ok(userService.registerUser(user));
	}
	
	@PostMapping("/login") 
	ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
		UserDetails user = userService.loadUserByUsername(request.getUsername());
		if (user != null) {
			authentication.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), 
					request.getPassword()));
		}
		final String jwt = tokenGenerator.generateToken(user);
		return ResponseEntity.ok(new JwtResponse("Login Successful",jwt));
	}
	
}
