package ru.itmo.potatocoder228.naumen_task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableMethodSecurity
@EnableWebMvc
public class NaumenInternTaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(NaumenInternTaskApplication.class, args);
    }
}
