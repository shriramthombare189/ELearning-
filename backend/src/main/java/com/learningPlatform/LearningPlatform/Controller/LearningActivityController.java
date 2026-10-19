package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.UserLearningActivity;
import com.learningPlatform.LearningPlatform.Services.LearningActivityService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learning")
@CrossOrigin("http://localhost:3000")
public class LearningActivityController {

    private final LearningActivityService service;

    public LearningActivityController(LearningActivityService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public UserLearningActivity saveLearningData(@RequestBody UserLearningActivity data) {
        return service.save(data);
    }

}
