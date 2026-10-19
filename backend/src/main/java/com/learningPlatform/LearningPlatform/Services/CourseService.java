package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.Course;
import com.learningPlatform.LearningPlatform.Repository.CourseRepository;
import com.learningPlatform.LearningPlatform.Repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final PurchaseRepository purchaseRepository;

    public CourseService(CourseRepository courseRepository, PurchaseRepository purchaseRepository) {
        this.courseRepository = courseRepository;
        this.purchaseRepository = purchaseRepository;
    }

    // Save course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get course by ID
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
    // delete course by ID
    public Long deleteCourseById(Long id) {
        courseRepository.deleteById(id);
        return id;
    }
}
