package gbn.recipebook.recipe.filter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
@Component
public class TokenValidatorFilter extends OncePerRequestFilter {

	private String secret = "cmVjaXBlIGJvb2sgd2l0aCByZWNpcGVz";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			final String authHeader = request.getHeader("Authorization");
			String username = null;
			String token = null;

			if (authHeader != null && authHeader.startsWith("Bearer")) {
				token = authHeader.substring(7);
				username = extractUsername(token);
			}
			if (username != null ) {
				Authentication auth = new UsernamePasswordAuthenticationToken(username,
						null, AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER"));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}

			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException | SignatureException | MalformedJwtException | UnsupportedJwtException
				| IllegalArgumentException ex ) {

			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Invalid Token or Session Expired.");
			response.setContentType("application/json");
			response.setStatus(HttpStatus.FORBIDDEN.value());
			response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
		}

	}

	private String extractUsername(String token) {
		// TODO Auto-generated method stub
		Claims claims = Jwts.parserBuilder().setSigningKey(secret.getBytes(StandardCharsets.UTF_8)).build()
				.parseClaimsJws(token).getBody();

		return (String) claims.get("username");
	}

}
