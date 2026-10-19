package com.learningPlatform.LearningPlatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.learningPlatform.LearningPlatform.Entity")
@EnableJpaRepositories("com.learningPlatform.LearningPlatform.Repository")
public class BookPgApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookPgApplication.class, args);
	}
}
