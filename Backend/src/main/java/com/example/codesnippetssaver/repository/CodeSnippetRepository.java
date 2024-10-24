package com.example.codesnippetssaver.repository;

import com.example.codesnippetssaver.model.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {
    Optional<CodeSnippet> findByIdAndUserId(Long id, Long userId);
    List<CodeSnippet> findAllByUserId(Long userId);
}