package com.guga.futspring;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import com.guga.futspring.security.SecurityConstants;
import com.guga.futspring.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
	public CommandLineRunner createInitialUsers(UserServiceImpl userService, PeladaServiceImpl peladaService, DailyServiceImpl dailyService) {
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
					user.setRoles(Stream.of(SecurityConstants.SPRING_ROLE_PREFIX + SecurityConstants.ROLE_USER).collect(Collectors.toCollection(HashSet::new)));

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

			/*if(peladaService.getPeladas().isEmpty() && dailyService.getDailys().isEmpty()) {
				Pelada pelada = new Pelada();

				pelada.setAddress("Abdias de Carvalho");
				pelada.setName("Jogasse Onde?");
				pelada.setReference("Ilha do retiro");
				pelada.setPlayers(userService.getUsers());

				pelada.setDuration(2);
				pelada.setAutoCreateDailyEnabled(true);

				LocalTime currentTime = LocalTime.now();
				LocalTime peladaTime = currentTime.minusHours(1);
				pelada.setTimeOfDay(peladaTime);

				LocalDate today = LocalDate.now();
				DayOfWeek currentDay = today.getDayOfWeek();
				DayOfWeek peladaDay = currentDay.plus(1);
				pelada.setDayOfWeek(peladaDay);

				peladaService.savePelada(pelada, null);
				System.out.println("Pelada criada com sucesso!");
			} else {
				System.out.println("O db ja tem uma pelada. Pulando a criação de pelada.");
			}

			peladaService.getPeladas().forEach(u -> System.out.println("ID: " + u.getId() + ", Username: " + u.getName() + ", Email: " + u.getAddress()));
			System.out.println("----------------------------------------------"); */

		};
	}
}
