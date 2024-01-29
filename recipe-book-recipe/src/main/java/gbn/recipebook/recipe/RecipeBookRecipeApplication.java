package gbn.recipebook.recipe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import feign.Retryer;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class RecipeBookRecipeApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeBookRecipeApplication.class, args);
	}

	@Bean
	public Retryer retryer() {
		return new Retryer.Default(100, 1000, 3); // 3 retries with a 1-second backoff
	}

}
