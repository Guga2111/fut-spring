package com.guga.futspring.security;

import com.guga.futspring.security.filters.AuthenticationFilter;
import com.guga.futspring.security.filters.ExceptionHandlerFilter;
import com.guga.futspring.security.filters.JWTAuthorizationFilter;
import com.guga.futspring.security.manager.CustomAuthManager;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig {

    private final CustomAuthManager customAuthManager;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthManager);
        authenticationFilter.setFilterProcessesUrl("/authenticate");

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz

                        //public routes
                        .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        .requestMatchers("/h2/**").permitAll() // remover em produção
                        .requestMatchers(HttpMethod.POST, SecurityConstants.REGISTER_PATH).permitAll()
                        .requestMatchers(HttpMethod.GET,"/stats/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/team/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/pelada/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/daily/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/match/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/league-table/**").permitAll()

                        //user routes
                        .requestMatchers(HttpMethod.PUT, "/user/**").hasRole(SecurityConstants.ROLE_USER)

                        //stats routes
                        .requestMatchers(HttpMethod.PUT, "/stats/{id}").hasRole(SecurityConstants.ROLE_USER)

                        //peladas routes (miss of edit pelada)
                        .requestMatchers(HttpMethod.POST, "/pelada/**").hasRole(SecurityConstants.ROLE_USER)
                        //With @PreAuthorize verify what pelada he is the admin
                        .requestMatchers(HttpMethod.PUT, "/pelada/{id}/user/{userId}").hasRole(SecurityConstants.ROLE_ADMIN_PELADA)
                        .requestMatchers(HttpMethod.DELETE, "/pelada/**").hasRole(SecurityConstants.ROLE_ADMIN_PELADA)

                        //daily routes
                        .requestMatchers(HttpMethod.PUT, "/daily/{dailyId}/confirm-presence/{userId}").hasRole(SecurityConstants.ROLE_USER)
                        .requestMatchers(HttpMethod.PUT, "/daily/{dailyId}/disconfirm-presence/{userId}").hasRole(SecurityConstants.ROLE_USER)
                        //With @PreAuthorize verify if the user is in the list of confirmedPlayers
                        .requestMatchers(HttpMethod.POST, "/daily/**").hasRole(SecurityConstants.ROLE_USER)
                        .requestMatchers(HttpMethod.PUT, "/daily/{id}/finalize/puskas/{puskasWinnerId}/wittball/{wittballWinnerId}").hasRole(SecurityConstants.ROLE_USER)
                        .requestMatchers(HttpMethod.PUT, "/daily/{id}/champions-image").hasRole(SecurityConstants.ROLE_USER)

                        //ranking routes
                        .requestMatchers(HttpMethod.GET,"/ranking/**").permitAll()

                        //match routes
                        //Verify if who is using this endpoint is in the list of confirmedPlayers
                        .requestMatchers(HttpMethod.PUT,"/match/**").hasRole(SecurityConstants.ROLE_USER)

                        //chat routes
                        //with @PreAuthorize verify if the user is member of the group pelada, even for the GET endpoint
                        .requestMatchers("/chat/**").hasRole(SecurityConstants.ROLE_USER)

                        .requestMatchers("_test/**").permitAll() // remove in production
                        .requestMatchers(HttpMethod.GET, "/user/images/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
                .addFilter(authenticationFilter)
                .addFilterAfter(new JWTAuthorizationFilter(), AuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.headers(headers -> headers.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable()));
        return http.build();
    }
    
}
