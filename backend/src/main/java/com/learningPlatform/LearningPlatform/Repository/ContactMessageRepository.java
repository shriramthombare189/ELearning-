package com.learningPlatform.LearningPlatform.Repository;


import com.learningPlatform.LearningPlatform.Entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
