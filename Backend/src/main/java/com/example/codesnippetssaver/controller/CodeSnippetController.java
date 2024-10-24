package com.example.codesnippetssaver.controller;

import com.example.codesnippetssaver.model.CodeSnippet;
import com.example.codesnippetssaver.service.CodeSnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/code-snippets")
@CrossOrigin(origins = "http://localhost:5173")
public class CodeSnippetController {

    private final CodeSnippetService service;

    @Autowired
    public CodeSnippetController(CodeSnippetService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CodeSnippet>> getUserCodeSnippets(@PathVariable Long userId) {
        List<CodeSnippet> userSnippets = service.getCodeSnippetsByUserId(userId);
        return ResponseEntity.ok(userSnippets);
    }

    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<CodeSnippet> getCodeSnippetByIdAndUserId(@PathVariable Long id, @PathVariable Long userId) {
        return service.getCodeSnippetByIdAndUserId(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CodeSnippet> createCodeSnippet(@RequestBody CodeSnippet codeSnippet,
                                                         @RequestParam("userId") Long userId) {
        CodeSnippet savedSnippet = service.save(codeSnippet, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSnippet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodeSnippet> updateCodeSnippet(@PathVariable Long id,
                                                         @RequestBody CodeSnippet codeSnippet,
                                                         @RequestParam("userId") Long userId) {
        CodeSnippet updatedSnippet = service.update(id, codeSnippet, userId);
        return ResponseEntity.ok(updatedSnippet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodeSnippet(@PathVariable Long id,
                                                  @RequestParam("userId") Long userId) {
        service.deleteById(id, userId);
        return ResponseEntity.noContent().build();
    }
}