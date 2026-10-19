package com.learningPlatform.LearningPlatform.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "main_page_content")
public class MainPageContend {

    @Id
    private Long id;

    // ================= HERO SECTION =================
    private String heroSecHeadLine;
    private String heroSecTagLine;

    public String getLinkdinLink() {
        return linkdinLink;
    }

    public void setLinkdinLink(String linkdinLink) {
        this.linkdinLink = linkdinLink;
    }

    public String getFeacBookLink() {
        return feacBookLink;
    }

    public void setFeacBookLink(String feacBookLink) {
        this.feacBookLink = feacBookLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

    public String getFooterSecTagLine() {
        return footerSecTagLine;
    }

    public void setFooterSecTagLine(String footerSecTagLine) {
        this.footerSecTagLine = footerSecTagLine;
    }

    public String getContactLocation() {
        return contactLocation;
    }

    public void setContactLocation(String contactLocation) {
        this.contactLocation = contactLocation;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getAboutSecMissionTagline() {
        return aboutSecMissionTagline;
    }

    public void setAboutSecMissionTagline(String aboutSecMissionTagline) {
        this.aboutSecMissionTagline = aboutSecMissionTagline;
    }

    public String getCourseSecTagline() {
        return courseSecTagline;
    }

    public void setCourseSecTagline(String courseSecTagline) {
        this.courseSecTagline = courseSecTagline;
    }

    public String getHeroSecTagLine() {
        return heroSecTagLine;
    }

    public void setHeroSecTagLine(String heroSecTagLine) {
        this.heroSecTagLine = heroSecTagLine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeroSecHeadLine() {
        return heroSecHeadLine;
    }

    public void setHeroSecHeadLine(String heroSecHeadLine) {
        this.heroSecHeadLine = heroSecHeadLine;
    }

    public List<String> getCourseSecHeadlines() {
        return courseSecHeadlines;
    }

    public void setCourseSecHeadlines(List<String> courseSecHeadlines) {
        this.courseSecHeadlines = courseSecHeadlines;
    }

    public String getAboutSecTagline() {
        return aboutSecTagline;
    }

    public void setAboutSecTagline(String aboutSecTagline) {
        this.aboutSecTagline = aboutSecTagline;
    }

    public String getAboutSecVisionTagline() {
        return aboutSecVisionTagline;
    }

    public void setAboutSecVisionTagline(String aboutSecVisionTagline) {
        this.aboutSecVisionTagline = aboutSecVisionTagline;
    }

    public List<String> getAboutSecChooseUs() {
        return aboutSecChooseUs;
    }

    public void setAboutSecChooseUs(List<String> aboutSecChooseUs) {
        this.aboutSecChooseUs = aboutSecChooseUs;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    // ================= COURSE SECTION =================
    @ElementCollection
    @CollectionTable(
            name = "course_sec_headlines",
            joinColumns = @JoinColumn(name = "content_id")
    )
    @Column(name = "headline")
    private List<String> courseSecHeadlines = new ArrayList<>();

    private String courseSecTagline;

    // ================= ABOUT SECTION =================
    private String aboutSecTagline;
    private String aboutSecMissionTagline;
    private String aboutSecVisionTagline;

    // ================= WHY CHOOSE US =================
    @ElementCollection
    @CollectionTable(
            name = "about_sec_choose_us",
            joinColumns = @JoinColumn(name = "content_id")
    )
    @Column(name = "feature")
    private List<String> aboutSecChooseUs = new ArrayList<>();

    // ================= CONTACT SECTION =================
    private String contactEmail;
    private String contactNumber;
    private String contactLocation;

    // ================= FOOTER SECTION =================
    private String footerSecTagLine;
    private String instagramLink;
    private String feacBookLink;
    private String linkdinLink;

    // ================= CONSTRUCTOR =================
    public MainPageContend() {
    }
}
