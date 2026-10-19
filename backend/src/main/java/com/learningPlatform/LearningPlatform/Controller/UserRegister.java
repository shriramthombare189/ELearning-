package com.learningPlatform.LearningPlatform.Controller;


import com.learningPlatform.LearningPlatform.Entity.Registration;
import com.learningPlatform.LearningPlatform.Services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/new")
@CrossOrigin("http://localhost:3000")
public class UserRegister {

    private final AuthService authService;

    public UserRegister(AuthService authService) {
        this.authService = authService;
    }

    // ================= REGISTER =================

    // Save data (Register)
    @PostMapping
    public ResponseEntity<?> SaveData(@RequestBody Registration data) {
        try {
            Registration savedUser = authService.SaveData(data);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage()); // "Email Already Registered"
        }
    }

    // ================= GET USERS =================

    // Get All Data
    @GetMapping
    public List<Registration> Getall() {
        return authService.GetallData();
    }

    // Find By Id
    @GetMapping("/{id}")
    public Optional<Registration> FiendByID(@PathVariable("id") Long id) {
        return authService.FiendByID(id);
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {

        try {
            Registration user = authService.login(
                    data.get("email"),
                    data.get("password")
            );

            return ResponseEntity.ok(user); // ✅ Login Success

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage()); // ❌ Invalid Email or Password
        }
    }
}
