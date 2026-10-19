package com.learningPlatform.LearningPlatform.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_learning_activity")
public class UserLearningActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // USER
    private String userEmail;

    // COURSE
    private Long courseId;
    private String courseName;
    private int totalVideos;

    // CURRENT VIDEO
    private int currentVideoId;
    private String currentVideoTitle;
    private String currentVideoDuration;
    private String youtubeId;
    private boolean videoCompleted;
    private LocalDateTime videoCompletedAt;

    // NOTES
    @Column(length = 2000)
    private String noteContent;
    private boolean noteAutoSaved;
    private LocalDateTime noteLastSavedAt;

    // QUIZ
    private int quizTotalQuestions;
    private int quizMarksObtained;
    private boolean quizPassed;

    @ElementCollection
    private List<String> quizAnswers;

    private LocalDateTime quizAttemptedAt;

    // PROGRESS
    private int progressPercentage;
    private boolean courseCompleted;
    private int lastWatchedVideoId;

    @ElementCollection
    private List<Integer> completedVideos;

    // META
    private String device;
    private String platform;
    private String ipAddress;
    private LocalDateTime updatedAt;

    // getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getTotalVideos() {
        return totalVideos;
    }

    public void setTotalVideos(int totalVideos) {
        this.totalVideos = totalVideos;
    }

    public int getCurrentVideoId() {
        return currentVideoId;
    }

    public void setCurrentVideoId(int currentVideoId) {
        this.currentVideoId = currentVideoId;
    }

    public String getCurrentVideoTitle() {
        return currentVideoTitle;
    }

    public void setCurrentVideoTitle(String currentVideoTitle) {
        this.currentVideoTitle = currentVideoTitle;
    }

    public String getCurrentVideoDuration() {
        return currentVideoDuration;
    }

    public void setCurrentVideoDuration(String currentVideoDuration) {
        this.currentVideoDuration = currentVideoDuration;
    }

    public String getYoutubeId() {
        return youtubeId;
    }

    public void setYoutubeId(String youtubeId) {
        this.youtubeId = youtubeId;
    }

    public boolean isVideoCompleted() {
        return videoCompleted;
    }

    public void setVideoCompleted(boolean videoCompleted) {
        this.videoCompleted = videoCompleted;
    }

    public LocalDateTime getVideoCompletedAt() {
        return videoCompletedAt;
    }

    public void setVideoCompletedAt(LocalDateTime videoCompletedAt) {
        this.videoCompletedAt = videoCompletedAt;
    }

    public String getNoteContent() {
        return noteContent;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }

    public boolean isNoteAutoSaved() {
        return noteAutoSaved;
    }

    public void setNoteAutoSaved(boolean noteAutoSaved) {
        this.noteAutoSaved = noteAutoSaved;
    }

    public LocalDateTime getNoteLastSavedAt() {
        return noteLastSavedAt;
    }

    public void setNoteLastSavedAt(LocalDateTime noteLastSavedAt) {
        this.noteLastSavedAt = noteLastSavedAt;
    }

    public int getQuizTotalQuestions() {
        return quizTotalQuestions;
    }

    public void setQuizTotalQuestions(int quizTotalQuestions) {
        this.quizTotalQuestions = quizTotalQuestions;
    }

    public int getQuizMarksObtained() {
        return quizMarksObtained;
    }

    public void setQuizMarksObtained(int quizMarksObtained) {
        this.quizMarksObtained = quizMarksObtained;
    }

    public boolean isQuizPassed() {
        return quizPassed;
    }

    public void setQuizPassed(boolean quizPassed) {
        this.quizPassed = quizPassed;
    }

    public List<String> getQuizAnswers() {
        return quizAnswers;
    }

    public void setQuizAnswers(List<String> quizAnswers) {
        this.quizAnswers = quizAnswers;
    }

    public LocalDateTime getQuizAttemptedAt() {
        return quizAttemptedAt;
    }

    public void setQuizAttemptedAt(LocalDateTime quizAttemptedAt) {
        this.quizAttemptedAt = quizAttemptedAt;
    }

    public int getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(int progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public boolean isCourseCompleted() {
        return courseCompleted;
    }

    public void setCourseCompleted(boolean courseCompleted) {
        this.courseCompleted = courseCompleted;
    }

    public int getLastWatchedVideoId() {
        return lastWatchedVideoId;
    }

    public void setLastWatchedVideoId(int lastWatchedVideoId) {
        this.lastWatchedVideoId = lastWatchedVideoId;
    }

    public List<Integer> getCompletedVideos() {
        return completedVideos;
    }

    public void setCompletedVideos(List<Integer> completedVideos) {
        this.completedVideos = completedVideos;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
