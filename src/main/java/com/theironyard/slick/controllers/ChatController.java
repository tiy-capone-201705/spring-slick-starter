package com.theironyard.slick.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	@MessageMapping("/chat")
	@SendTo("/topic/chats")
	public String handleMessage(String message) {
		return message;
	}
	
}
