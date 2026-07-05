package com.portfolio.controller;

import com.portfolio.model.*;
import com.portfolio.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @Autowired
    private DataService dataService;

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() throws IOException {
        Profile profile = dataService.loadObject("profile.json", Profile.class);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/education")
    public ResponseEntity<List<Education>> getEducation() throws IOException {
        List<Education> list = dataService.loadList("education.json", new com.fasterxml.jackson.core.type.TypeReference<List<Education>>() {});
        return ResponseEntity.ok(list);
    }

    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getExperience() throws IOException {
        List<Experience> list = dataService.loadList("experience.json", new com.fasterxml.jackson.core.type.TypeReference<List<Experience>>() {});
        return ResponseEntity.ok(list);
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() throws IOException {
        List<Skill> list = dataService.loadList("skills.json", new com.fasterxml.jackson.core.type.TypeReference<List<Skill>>() {});
        return ResponseEntity.ok(list);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() throws IOException {
        List<Project> list = dataService.loadList("projects.json", new com.fasterxml.jackson.core.type.TypeReference<List<Project>>() {});
        return ResponseEntity.ok(list);
    }

    @GetMapping("/languages")
    public ResponseEntity<List<Language>> getLanguages() throws IOException {
        List<Language> list = dataService.loadList("languages.json", new com.fasterxml.jackson.core.type.TypeReference<List<Language>>() {});
        return ResponseEntity.ok(list);
    }
}
