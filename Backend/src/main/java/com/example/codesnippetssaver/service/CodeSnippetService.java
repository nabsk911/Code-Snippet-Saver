package com.example.codesnippetssaver.service;

import com.example.codesnippetssaver.model.CodeSnippet;
import com.example.codesnippetssaver.model.CodeSnippetTag;
import com.example.codesnippetssaver.model.User;
import com.example.codesnippetssaver.repository.CodeSnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CodeSnippetService {

    @Autowired
    private CodeSnippetRepository repository;

    @Autowired
    private UserService userService;

    // Get all snippets for a specific user
    public List<CodeSnippet> getCodeSnippetsByUserId(Long userId) {
        return repository.findAllByUserId(userId);
    }

    // Get a specific snippet by ID and user
    public Optional<CodeSnippet> getCodeSnippetByIdAndUserId(Long id, Long userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public CodeSnippet save(CodeSnippet codeSnippet, Long userId) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        codeSnippet.setUser(user);
        return repository.save(codeSnippet);
    }



    public CodeSnippet update(Long id, CodeSnippet updatedSnippet, Long userId) {
        CodeSnippet existingSnippet = getCodeSnippetByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Snippet not found or you do not have permission"));

        // Update basic fields
        existingSnippet.setTitle(updatedSnippet.getTitle());
        existingSnippet.setDescription(updatedSnippet.getDescription());
        existingSnippet.setCode(updatedSnippet.getCode());
        existingSnippet.setLanguage(updatedSnippet.getLanguage());

        // Update tags
        Set<String> newTagSet = updatedSnippet.getTags().stream()
                .map(CodeSnippetTag::getTag)
                .collect(Collectors.toSet());

        // Remove tags that are no longer in the updated tag list
        existingSnippet.getTags().removeIf(existingTag -> !newTagSet.contains(existingTag.getTag()));

        // Add new tags
        Set<String> existingTagSet = existingSnippet.getTags().stream()
                .map(CodeSnippetTag::getTag)
                .collect(Collectors.toSet());

        for (String newTag : newTagSet) {
            if (!existingTagSet.contains(newTag)) {
                CodeSnippetTag tagToAdd = new CodeSnippetTag(existingSnippet, newTag);
                existingSnippet.addTag(tagToAdd);
            }
        }

        return repository.save(existingSnippet);
    }
    public void deleteById(Long id, Long userId) {
        CodeSnippet snippet = getCodeSnippetByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Snippet not found or you do not have permission"));
        repository.delete(snippet);
    }
}