package com.learningPlatform.LearningPlatform.Repository;

import com.learningPlatform.LearningPlatform.Entity.UserLearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserLearningActivityRepository extends JpaRepository<UserLearningActivity, Long> {



}

