package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.UserLearningActivity;
import com.learningPlatform.LearningPlatform.Repository.UserLearningActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningActivityService {

    private final UserLearningActivityRepository repo;

    public LearningActivityService(UserLearningActivityRepository repo) {
        this.repo = repo;
    }
    public UserLearningActivity save(UserLearningActivity data) {
        return repo.save(data);
    }
}
