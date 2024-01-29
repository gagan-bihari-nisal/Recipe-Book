package gbn.recipebook.user.config;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
        Map<String, String> responseBody = Collections.singletonMap("message", "UNAUTHORIZED");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType(MediaType.APPLICATION_JSON);
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
		
		
	}
	
}