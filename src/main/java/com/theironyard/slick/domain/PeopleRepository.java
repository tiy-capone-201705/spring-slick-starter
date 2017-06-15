package com.theironyard.slick.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Long> {

	public List<Person> findByNickName(String nickName);
	
}
