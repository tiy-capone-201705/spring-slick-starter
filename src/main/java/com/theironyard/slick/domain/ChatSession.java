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
	private Person loggedIn;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Person getLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(Person loggedIn) {
		this.loggedIn = loggedIn;
	}

}
