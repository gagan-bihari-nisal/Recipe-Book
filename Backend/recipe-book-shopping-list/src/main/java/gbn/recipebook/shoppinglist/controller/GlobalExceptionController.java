package gbn.recipebook.shoppinglist.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import gbn.recipebook.shoppinglist.exception.InvalidInputException;

@RestControllerAdvice
public class GlobalExceptionController {
	@ExceptionHandler(InvalidInputException.class)
	public ResponseEntity<?> handleInvalidInput(InvalidInputException ex) {
		Map<String, String> map = new HashMap<>();
		map.put("status", "error");
		map.put("message", ex.getLocalizedMessage());
		return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
	}
}
