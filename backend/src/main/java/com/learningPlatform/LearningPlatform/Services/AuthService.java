package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.Registration;
import com.learningPlatform.LearningPlatform.Repository.RegistrationRepo;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final RegistrationRepo registrationRepo;


    public AuthService(RegistrationRepo registrationRepo) {
        this.registrationRepo = registrationRepo;
    }

    // save data
    public Registration SaveData(Registration data) {

        // 🔍 Validate email
        if (data.getEmail() == null || data.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        
        if (!data.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }

        // 🔍 Validate password
        if (data.getPassword() == null || data.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        
        if (data.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        
        // 🔍 Validate fullName
        if (data.getFullName() == null || data.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Full name is required");
        }

        // 🔍 check email exists or not
        if (registrationRepo.existsByEmail(data.getEmail())) {
            throw new RuntimeException("Email Already Registered");
        }

        // ✅ Email not present → save user
        return registrationRepo.save(data);
    }

    //Get All Data
    public List<Registration> GetallData(){
        return registrationRepo.findAll();
    }



    //Fiend By ID
    public Optional<Registration> FiendByID(Long ID){
        return registrationRepo.findById(ID);
    }

    public Registration login(String email, String password) {

        Optional<Registration> userOpt = registrationRepo.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Email not registered");
        }

        Registration user = userOpt.get();

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user; // ✅ login success
    }

}
