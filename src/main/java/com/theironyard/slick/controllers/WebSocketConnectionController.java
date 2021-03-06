package com.theironyard.slick.controllers;

import org.springframework.context.ApplicationListener;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import com.theironyard.slick.domain.ChatSession;
import com.theironyard.slick.domain.ChatSessionsRepository;
import com.theironyard.slick.domain.PeopleRepository;
import com.theironyard.slick.domain.Person;

@Controller
public class WebSocketConnectionController implements ApplicationListener<SessionConnectedEvent> {

	private MessageSendingOperations<String> sender;
	private PeopleRepository people;
	private ChatSessionsRepository sessions;
	
	public WebSocketConnectionController(MessageSendingOperations<String> sender, PeopleRepository people, ChatSessionsRepository sessions) {
		this.sender = sender;
		this.people = people;
		this.sessions = sessions;
	}
	
	@Override
	public void onApplicationEvent(SessionConnectedEvent event) {
		Person joiner = people.findFirstByNickName(event.getUser().getName());
		sessions.saveAndFlush(new ChatSession(joiner));
		
		sender.convertAndSend("/topic/joins", joiner);
	}
	
}
