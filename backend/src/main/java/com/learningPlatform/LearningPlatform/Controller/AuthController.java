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
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Registration data) {
        try {
            Registration savedUser = authService.SaveData(data);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "success", true,
                            "message", "User registered successfully",
                            "data", savedUser
                    ));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "success", false,
                            "error", e.getMessage()
                    ));
        }
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        try {
            Registration user = authService.login(
                    data.get("email"),
                    data.get("password")
            );

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Login successful",
                            "data", user
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "error", e.getMessage()
                    ));
        }
    }

    // ================= GET ALL USERS =================
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<Registration> users = authService.GetallData();

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", users
                )
        );
    }

    // ================= GET USER BY ID =================
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<Registration> user = authService.FiendByID(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "data", user.get()
                    )
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "success", false,
                            "error", "User not found"
                    ));
        }
    }
}
