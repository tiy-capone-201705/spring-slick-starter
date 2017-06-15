package com.theironyard.slick.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

import com.theironyard.slick.domain.ChatMessage;
import com.theironyard.slick.domain.ChatMessagesRepository;
import com.theironyard.slick.domain.PeopleRepository;
import com.theironyard.slick.domain.Person;

@Controller
public class ChatController {
	
	private ChatMessagesRepository messages;
	private PeopleRepository people;
	
	public ChatController(ChatMessagesRepository messages, PeopleRepository people) {
		this.messages = messages;
		this.people = people;
	}
	
	@MessageMapping("/chat")
	@SendTo("/topic/chats")
	public ChatMessage handleMessage(UsernamePasswordAuthenticationToken token, String content) {
		Person author = people.findByNickName(token.getName()).get(0);
		ChatMessage message = messages.save(new ChatMessage(author, content));
		
		return message;
	}
	
}
