package com.example.codesnippetssaver.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "code_snippet_tags")
public class CodeSnippetTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "code_snippet_id", nullable = false)
    @JsonBackReference
    private CodeSnippet codeSnippet;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String tag;

    // Default constructor
    public CodeSnippetTag() {
    }

    // Parameterized constructor
    public CodeSnippetTag(CodeSnippet codeSnippet, String tag) {
        this.codeSnippet = codeSnippet;
        this.tag = tag;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CodeSnippet getCodeSnippet() {
        return codeSnippet;
    }

    public void setCodeSnippet(CodeSnippet codeSnippet) {
        this.codeSnippet = codeSnippet;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
