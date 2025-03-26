package com.guga.futspring;

import com.guga.futspring.entity.Player;
import com.guga.futspring.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FutspringApplication implements CommandLineRunner {

	@Autowired
	PlayerRepository playerRepository;

	public static void main(String[] args) {
		SpringApplication.run(FutspringApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		playerRepository.addPlayer(new Player(1L, "Guga"));
	}
}
