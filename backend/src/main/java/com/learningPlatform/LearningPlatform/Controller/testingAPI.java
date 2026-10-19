package com.learningPlatform.LearningPlatform.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testingAPI {
    @GetMapping("/test")
    public String Testfunction(){
        return "Test API Runsucsessfull";
    }
}
