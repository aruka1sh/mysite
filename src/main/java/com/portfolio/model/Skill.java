package com.portfolio.model;

public class Skill {
    private String category;
    private String name;
    private int proficiency; // 0-100 percentage

    // Getters and Setters
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getProficiency() { return proficiency; }
    public void setProficiency(int proficiency) { this.proficiency = proficiency; }
}
