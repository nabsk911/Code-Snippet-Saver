package com.example.codesnippetssaver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "code_snippets")
public class CodeSnippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String language;  // Renamed from 'languages' to 'language'

    @Column(columnDefinition = "TEXT")
    private String code;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "codeSnippet", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CodeSnippetTag> tags;

    @ManyToOne // Establishing the relationship with User
    @JoinColumn(name = "user_id", nullable = false) // Foreign key column
    @JsonBackReference
    private User user; // Reference to the User who owns the snippet

    // Default constructor
    public CodeSnippet() {
    }

    // Parameterized constructor
    public CodeSnippet(String title, String description, String language, String code, List<CodeSnippetTag> tags, User user) {
        this.title = title;
        this.description = description;
        this.language = language;  // Updated to 'language'
        this.code = code;
        this.tags = tags;
        this.createdAt = LocalDateTime.now();
        this.user = user; // Set the user
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLanguage() {  // Updated getter
        return language;
    }

    public void setLanguage(String language) {  // Updated setter
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<CodeSnippetTag> getTags() {
        return tags;
    }

    public void setTags(List<CodeSnippetTag> tags) {
        this.tags = tags;
    }

    public User getUser() {
        return user; // Getter for user
    }

    public void setUser(User user) {
        this.user = user; // Setter for user
    }

    // Helper methods to manage the bidirectional relationship
    public void addTag(CodeSnippetTag tag) {
        tags.add(tag);
        tag.setCodeSnippet(this);
    }

    public void removeTag(CodeSnippetTag tag) {
        tags.remove(tag);
        tag.setCodeSnippet(null);
    }
}
