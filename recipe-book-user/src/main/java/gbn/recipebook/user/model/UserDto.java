package gbn.recipebook.user.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
	@NotBlank(message = "First name cannot be left empty.")
	@Size(min = 3, max = 50, message = "First name should be in range of 3 and 50.")
	private String firstName;
	@NotBlank(message = "Last name cannot be left empty.")
	@Size(min = 3, max = 50, message = "Last name should be in range of 3 and 50.")
	private String lastName;
	@NotBlank(message = "Username cannot be left empty.")
	@Size(min = 3, max = 50, message = "Username should be in range of 3 and 50.")
	private String username;
	@NotBlank(message = "Password cannot be left empty.")
	private String password;
	
}
