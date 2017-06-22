package com.theironyard.slick.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests() //set up for writing instructions on whether something needs to be authorized or not
				.antMatchers("/login", "/card-photo.jpeg", "/pure-0.6.2.min.css", "/webjars/**", "/angular*", "/app*", "/chat-input/*", "/logout/*", "/header/*", "/messages-list/*", "/data/*", "/autofocus/*", "/login/*", "/msgng/*", "/users-list/*").permitAll()
				.antMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().authenticated() //any other request other than above authenticate anyway...NOTE: all of API end points like ChatMessagesApiController or WebSocketConnectionController you need to be authenticated
			.and()
			.formLogin()
				.loginPage("/login")
				.defaultSuccessUrl("/")
			.and()
			.csrf().disable();
	}
	
	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("slick").password("slick").roles("USER", "ADMIN"); //just this guy admin
		auth.inMemoryAuthentication().withUser("happy").password("happy").roles("USER");
		auth.inMemoryAuthentication().withUser("lotr").password("lotr").roles("USER");
	}
	
}
