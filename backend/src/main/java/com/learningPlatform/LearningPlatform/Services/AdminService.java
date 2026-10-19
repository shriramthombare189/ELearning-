package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.Admin;
import com.learningPlatform.LearningPlatform.Repository.AdminRepo;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepo adminRepo;

    public AdminService(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    // 🔹 Register Admin
    public Admin register(Admin admin) {

        if (adminRepo.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Admin already exists");
        }

        return adminRepo.save(admin);
    }

    // 🔹 Admin Login
    public Admin login(String email, String password) {

        Admin admin = adminRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return admin;
    }
}
