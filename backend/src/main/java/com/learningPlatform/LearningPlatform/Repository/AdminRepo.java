package com.learningPlatform.LearningPlatform.Repository;

import com.learningPlatform.LearningPlatform.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {

    Optional<Admin>findByEmail(String email);

    boolean existsByEmail(String email);
}
