package com.example.codesnippetssaver.controller;

import com.example.codesnippetssaver.model.CodeSnippetTag;
import com.example.codesnippetssaver.service.CodeSnippetTagService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/code-snippet-tags")
public class CodeSnippetTagController {

    @Autowired
    private CodeSnippetTagService service;

    @GetMapping
    public List<CodeSnippetTag> getAllCodeSnippetTags() {
        return service.findAll();
    }

    @PostMapping
    public CodeSnippetTag createCodeSnippetTag(@RequestBody CodeSnippetTag codeSnippetTag) {
        return service.save(codeSnippetTag);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodeSnippetTag> updateCodeSnippetTag(@PathVariable Long id, @RequestBody CodeSnippetTag codeSnippetTag) {
        CodeSnippetTag updatedTag = service.update(id, codeSnippetTag);
        return updatedTag != null ? ResponseEntity.ok(updatedTag) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodeSnippetTag(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}