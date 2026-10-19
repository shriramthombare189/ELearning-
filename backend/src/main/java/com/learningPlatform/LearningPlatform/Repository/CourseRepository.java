package com.learningPlatform.LearningPlatform.Repository;

import com.learningPlatform.LearningPlatform.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course , Long> {

}
