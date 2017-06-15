package com.theironyard.slick.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.theironyard.slick.domain.ChatMessage;
import com.theironyard.slick.domain.ChatMessagesRepository;

@RestController
@RequestMapping("/api/messages")
public class ChatMessagesApiController {
	
	private ChatMessagesRepository messages;
	
	public ChatMessagesApiController(ChatMessagesRepository messages) {
		this.messages = messages;
	}

	@GetMapping
	public List<ChatMessage> getAll() {
		return this.messages.findAll();
	}
	
}
