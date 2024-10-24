package com.example.codesnippetssaver.repository;



import com.example.codesnippetssaver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { 

    Optional<User> findUserByEmail(String email); 

}