package com.example.codesnippetssaver.repository;

import com.example.codesnippetssaver.model.CodeSnippetTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeSnippetTagRepository extends JpaRepository<CodeSnippetTag, Long> {
}