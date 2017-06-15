package com.theironyard.slick.controllers;

import org.springframework.context.ApplicationListener;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import com.theironyard.slick.domain.PeopleRepository;
import com.theironyard.slick.domain.Person;

@Controller
public class WebSocketConnectionController implements ApplicationListener<SessionConnectedEvent> {

	private MessageSendingOperations<String> sender;
	private PeopleRepository people;
	
	public WebSocketConnectionController(MessageSendingOperations<String> sender, PeopleRepository people) {
		this.sender = sender;
		this.people = people;
	}
	
	@Override
	public void onApplicationEvent(SessionConnectedEvent event) {
		Person joiner = people.findByNickName(event.getUser().getName()).get(0);
		sender.convertAndSend("/topic/joins", joiner);
	}
	
}
