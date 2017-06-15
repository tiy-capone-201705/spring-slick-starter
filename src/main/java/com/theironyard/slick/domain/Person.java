package com.theironyard.slick.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
public class Person {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	
	@NotEmpty
	private String nickName;
	
	public Person() {}
	
	public Person(String nickName) {
		this.nickName = nickName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

}
