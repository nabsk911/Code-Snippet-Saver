package com.example.codesnippetssaver.service;


import com.example.codesnippetssaver.model.CodeSnippetTag;
import com.example.codesnippetssaver.repository.CodeSnippetTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeSnippetTagService {

    @Autowired
    private CodeSnippetTagRepository repository;

    public List<CodeSnippetTag> findAll() {
        return repository.findAll();
    }

    public Optional<CodeSnippetTag> findById(Long id) {
        return repository.findById(id);
    }

    public CodeSnippetTag save(CodeSnippetTag codeSnippetTag) {
        return repository.save(codeSnippetTag);
    }

    public CodeSnippetTag update(Long id, CodeSnippetTag updatedTag) {
        return repository.findById(id)
                .map(existingTag -> {
                    existingTag.setTag(updatedTag.getTag());
                    return repository.save(existingTag);
                })
                .orElse(null); // Or throw an exception if not found
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
