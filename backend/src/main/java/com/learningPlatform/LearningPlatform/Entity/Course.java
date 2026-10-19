package com.learningPlatform.LearningPlatform.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String courseName;
    private String courseThumbnail;
    private String courseTagLine;

    @ElementCollection
    private List<String> features;

    @ElementCollection
    private List<String> whatYouLearn;

    @ElementCollection
    private List<String> courseIncludes;

    @Column(length = 3000)
    private String courseDescription;

    @ElementCollection
    private List<String> coursePrice;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private List<Video> videos;

    // getters & setters

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseThumbnail() {
        return courseThumbnail;
    }

    public void setCourseThumbnail(String courseThumbnail) {
        this.courseThumbnail = courseThumbnail;
    }

    public String getCourseTagLine() {
        return courseTagLine;
    }

    public void setCourseTagLine(String courseTagLine) {
        this.courseTagLine = courseTagLine;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public List<String> getWhatYouLearn() {
        return whatYouLearn;
    }

    public void setWhatYouLearn(List<String> whatYouLearn) {
        this.whatYouLearn = whatYouLearn;
    }

    public List<String> getCourseIncludes() {
        return courseIncludes;
    }

    public void setCourseIncludes(List<String> courseIncludes) {
        this.courseIncludes = courseIncludes;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public List<String> getCoursePrice() {
        return coursePrice;
    }

    public void setCoursePrice(List<String> coursePrice) {
        this.coursePrice = coursePrice;
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

}
