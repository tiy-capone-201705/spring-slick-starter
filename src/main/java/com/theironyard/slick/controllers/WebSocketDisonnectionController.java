package com.theironyard.slick.controllers;

import org.springframework.context.ApplicationListener;

import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.theironyard.slick.domain.ChatSession;
import com.theironyard.slick.domain.ChatSessionsRepository;
import com.theironyard.slick.domain.PeopleRepository;
import com.theironyard.slick.domain.Person;

@Controller
public class WebSocketDisonnectionController implements ApplicationListener<SessionDisconnectEvent> {

	private MessageSendingOperations<String> sender;
	private PeopleRepository people;
	private ChatSessionsRepository sessions;
	
	public WebSocketDisonnectionController(MessageSendingOperations<String> sender, PeopleRepository people, ChatSessionsRepository sessions) {
		this.sender = sender;
		this.people = people;
		this.sessions = sessions;
	}
	
	@Override
	public void onApplicationEvent(SessionDisconnectEvent event) {
		Person joiner = people.findFirstByNickName(event.getUser().getName());
		ChatSession session = sessions.findFirstByParticipant(joiner);
		if (session != null) {
			sessions.delete(session);
		}
		
		sender.convertAndSend("/topic/departures", joiner);
	}
	
}
