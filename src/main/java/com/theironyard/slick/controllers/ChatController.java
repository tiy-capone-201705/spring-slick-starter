package com.theironyard.slick.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	@MessageMapping("/chat")
	@SendTo("/topic/chats")
	public AttributedMessage handleMessage(UsernamePasswordAuthenticationToken token, String message) {
		return new AttributedMessage(token.getName(), message);
	}
	
	static class AttributedMessage {
		private String name;
		private String message;
		
		public AttributedMessage() {}
		
		public AttributedMessage(String name, String message) {
			this.name = name;
			this.message = message;
		}
		
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		
	}
	
}
