package com.guga.futspring;

import com.guga.futspring.entity.User;
import com.guga.futspring.service.UserService;
import com.guga.futspring.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class FutspringApplication {

	public static void main(String[] args) {
		SpringApplication.run(FutspringApplication.class, args);

	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CommandLineRunner createInitialUsers(UserService userService) {
		return args -> {
			System.out.println("----------------------------------------------");

			if (userService.getUsers().isEmpty()) {
				for (int i = 1; i <= 19; i++) {
					User user = new User();
					user.setEmail("user" + i + "@example.com");
					user.setUsername("User" + i);
					user.setPassword("123");
					user.setStars(5 - (i % 5));
					user.setPosition("LW");

					userService.saveUser(user);
					System.out.println("Usuário criado: " + user.getUsername());
				}
				System.out.println("19 usuários iniciais foram criados com sucesso!");
			} else {
				System.out.println("O banco de dados já contém usuários. Pulando a criação de usuários iniciais.");
			}

			System.out.println("Total de usuários no banco de dados: " + userService.getUsers().size());
			userService.getUsers().forEach(u -> System.out.println("ID: " + u.getId() + ", Username: " + u.getUsername() + ", Email: " + u.getEmail()));
			System.out.println("----------------------------------------------");
		};
	}
}
