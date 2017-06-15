package com.theironyard.slick.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatSessionsRepository extends JpaRepository<ChatSession, Long> {
	
	public ChatSession findFirstByParticipant(Person person);
	
}
