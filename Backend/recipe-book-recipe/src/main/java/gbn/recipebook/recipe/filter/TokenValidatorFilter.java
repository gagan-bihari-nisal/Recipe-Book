package gbn.recipebook.recipe.filter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
@Component
public class TokenValidatorFilter extends OncePerRequestFilter{
	
	private String secret = "cmVjaXBlIGJvb2sgcHJvamVjdA==";


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
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
		
	}

	private String extractUsername(String token) {
		// TODO Auto-generated method stub
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
				.build()
				.parseClaimsJws(token)
				.getBody();
		return (String) claims.get("username");
	}

}
