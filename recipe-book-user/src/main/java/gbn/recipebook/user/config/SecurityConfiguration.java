package gbn.recipebook.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import gbn.recipebook.user.filter.TokenValidatorFilter;
import gbn.recipebook.user.service.UserService;

@Configuration
public class SecurityConfiguration {
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	UserService service;

	@Autowired
	private JwtAuthenticationEntryPoint entryPoint;

	@Bean
	public DaoAuthenticationProvider daoAuthProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(service);
		provider.setPasswordEncoder(encoder);
		return provider;
	}

	@Bean
	SecurityFilterChain defaultFilterChain(HttpSecurity http) throws Exception {

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.cors().and().csrf().disable();

		http.authorizeRequests().antMatchers("/register", "/login").permitAll().anyRequest().authenticated();
		http.authenticationProvider(daoAuthProvider());

		http.exceptionHandling().authenticationEntryPoint(entryPoint);
		http.addFilterBefore(new TokenValidatorFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}


}
