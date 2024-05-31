package com.example.jarvis;

// Spring application is a convenient way to bootstrap a spring application that will be started from a main method
// It will automatically scan for components in the same package and subpackages
// It will also automatically configure the application based on the dependencies that are added to the project
// It is an annotation that combines 3 annotations: @Configuration, @ComponentScan, @EnableAutoConfiguration to set up the application
import org.springframework.boot.SpringApplication;

// This annotation is used to mark a class as a Spring Boot Application
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // This annotation indicates that this class serves as the entry point for the Spring Boot application
public class JarvisApplication {

	public static void main(String[] args) {
		// This method is used to start the Spring Boot application
		SpringApplication.run(JarvisApplication.class, args);
	}

}
