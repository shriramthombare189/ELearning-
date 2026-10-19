package com.learningPlatform.LearningPlatform.Repository;

import com.learningPlatform.LearningPlatform.Entity.Purchase;
import com.learningPlatform.LearningPlatform.Entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Long> {

    Optional<Registration>findByEmail(String userEmail);

    @Query("SELECT COUNT(r) > 0 FROM Registration r WHERE r.email = :email")
    boolean existsByEmail(String email);

    @Query("SELECT p FROM Purchase p WHERE p.userEmail = :email")
    long getDataByEmail(String email);
}
