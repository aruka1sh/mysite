package com.portfolio.model;

public class Project {
    private String name;
    private String description;
    private String[] features;
    private String[] techStack;
    private String[] imageUrls;
    private String githubUrl;
    private String liveDemoUrl;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String[] getFeatures() { return features; }
    public void setFeatures(String[] features) { this.features = features; }
    public String[] getTechStack() { return techStack; }
    public void setTechStack(String[] techStack) { this.techStack = techStack; }
    public String[] getImageUrls() { return imageUrls; }
    public void setImageUrls(String[] imageUrls) { this.imageUrls = imageUrls; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLiveDemoUrl() { return liveDemoUrl; }
    public void setLiveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; }
}
