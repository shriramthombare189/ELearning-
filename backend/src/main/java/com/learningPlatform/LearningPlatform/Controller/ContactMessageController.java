package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.ContactMessage;
import com.learningPlatform.LearningPlatform.Services.ContactMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("http://localhost:3000")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @GetMapping
    public List<ContactMessage> GetAllMessage() {
        return service.GetAll();
    }

    // ✅ Save Contact Message
    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody ContactMessage message) {
        ContactMessage saved = service.save(message);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
}
