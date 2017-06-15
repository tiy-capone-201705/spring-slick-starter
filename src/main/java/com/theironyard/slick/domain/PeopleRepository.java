package com.theironyard.slick.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Long> {

	public Person findFirstByNickName(String nickName);
	
}
