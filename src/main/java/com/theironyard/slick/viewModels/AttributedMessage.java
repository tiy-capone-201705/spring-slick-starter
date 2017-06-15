package com.theironyard.slick.viewModels;

public class AttributedMessage {
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