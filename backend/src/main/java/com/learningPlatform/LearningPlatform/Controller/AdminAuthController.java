package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.Admin;
import com.learningPlatform.LearningPlatform.Services.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
    @RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminAuthController {

    private final AdminService adminService;

    public AdminAuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 🔹 Admin Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) { // shriram this posat manb API
        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(adminService.register(admin));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    // 🔹 Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        try {
            Admin admin = adminService.login(
                    data.get("email"),
                    data.get("password")
            );

            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}
