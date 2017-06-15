package com.theironyard.slick.configuration;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.theironyard.slick.domain.ChatMessage;
import com.theironyard.slick.domain.ChatMessagesRepository;
import com.theironyard.slick.domain.PeopleRepository;
import com.theironyard.slick.domain.Person;

@Configuration
@Profile("development")
public class DevelopmentSeedData {

	private PeopleRepository people;
	private ChatMessagesRepository messages;
	
	public DevelopmentSeedData(PeopleRepository people, ChatMessagesRepository messages) {
		this.people = people;
		this.messages = messages;
	}
	
	@PostConstruct
	public void InsertData() {
		Person slick = people.save(new Person("slick"));
		Person happy = people.save(new Person("happy"));
		Person lotr = people.save(new Person("lotr"));
		
		messages.save(new ChatMessage(slick, "Welcome to my chat application!"));
		messages.save(new ChatMessage(happy, "Thanks, slick!"));
		messages.save(new ChatMessage(lotr, "Glad to be here!"));
		messages.save(new ChatMessage(slick, "What do you want to talk about?"));
		messages.save(new ChatMessage(lotr, "Lord of the Rings!"));
		messages.save(new ChatMessage(happy, "Poltics... :)"));
	}
	
}
