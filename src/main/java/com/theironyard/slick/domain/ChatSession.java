package com.theironyard.slick.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class ChatSession {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	
	@OneToOne
	private Person participant;
	
	public ChatSession() {}
	
	public ChatSession(Person participant) {
		this.participant = participant;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Person getParticipant() {
		return participant;
	}

	public void setParticipant(Person participant) {
		this.participant = participant;
	}

}
