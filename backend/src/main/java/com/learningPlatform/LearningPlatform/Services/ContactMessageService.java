package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.ContactMessage;
import com.learningPlatform.LearningPlatform.Repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage save(ContactMessage message) {
        return repository.save(message);
    }

    public List<ContactMessage> GetAll() {
        return repository.findAll();
    }

}
