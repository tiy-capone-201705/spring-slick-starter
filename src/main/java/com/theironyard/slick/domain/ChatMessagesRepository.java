package com.theironyard.slick.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessagesRepository extends JpaRepository<ChatMessage, Long> {

}
