package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.Admindata;
import com.learningPlatform.LearningPlatform.Services.AdminDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admindata")
@CrossOrigin("http://localhost:3000")
public class AdminDataController {

    private final AdminDataService adminDataService;

    // ✅ Constructor Injection (BEST PRACTICE)
    public AdminDataController(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    @GetMapping
    public Admindata getData() {
        return adminDataService.get();
    }
}
