package com.learningPlatform.LearningPlatform.Entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "user_registration",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email", name = "uk_email")
        }
)
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= BASIC INFO =================

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    // ================= USER PREFERENCES =================

    @Column(name = "course_updates", nullable = false)
    private boolean courseUpdates = false;

    @Column(name = "dark_mode", nullable = false)
    private boolean darkMode = false;

    @Column(name = "email_notifications", nullable = false)
    private boolean emailNotifications = false;

    @Column(name = "public_profile", nullable = false)
    private boolean publicProfile = false;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isCourseUpdates() {
        return courseUpdates;
    }

    public void setCourseUpdates(boolean courseUpdates) {
        this.courseUpdates = courseUpdates;
    }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }

    public boolean isEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public boolean isPublicProfile() {
        return publicProfile;
    }

    public void setPublicProfile(boolean publicProfile) {
        this.publicProfile = publicProfile;
    }
}
