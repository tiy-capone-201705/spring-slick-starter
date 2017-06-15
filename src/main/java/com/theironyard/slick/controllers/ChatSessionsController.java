package com.theironyard.slick.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.theironyard.slick.domain.ChatSessionsRepository;
import com.theironyard.slick.domain.Person;

@RestController
@RequestMapping("/api/active-users")
public class ChatSessionsController {

	private ChatSessionsRepository sessions;
	
	public ChatSessionsController(ChatSessionsRepository sessions) {
		this.sessions = sessions;
	}
	
	@GetMapping
	public List<Person> getAll() {
		return sessions.findAll()
			.stream()
			.map(session -> session.getParticipant())
			.collect(Collectors.toList());
	}
	
}
