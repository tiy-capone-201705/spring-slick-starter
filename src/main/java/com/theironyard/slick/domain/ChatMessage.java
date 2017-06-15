package com.theironyard.slick.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
public class ChatMessage {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToOne
	private Person author;
	
	@NotEmpty
	private String content;
	
	private Date sentOn;
	
	public ChatMessage() {}
	
	public ChatMessage(Person author, String content) {
		this.author = author;
		this.content = content;
		this.sentOn = new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Person getAuthor() {
		return author;
	}

	public void setAuthor(Person author) {
		this.author = author;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getSentOn() {
		return sentOn;
	}

	public void setSentOn(Date sentOn) {
		this.sentOn = sentOn;
	}
	
}
