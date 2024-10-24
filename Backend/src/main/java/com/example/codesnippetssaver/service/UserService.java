package com.example.codesnippetssaver.service;

import com.example.codesnippetssaver.model.User;
import com.example.codesnippetssaver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

   
    private final UserRepository userRepository;

 
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // This method returns a list of all users in the database
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

  
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

   
    public User getUserById(Long userId) {
        return findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    
    public User authenticateUser(String email, String password) {
        return userRepository.findUserByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }


    public User addNewUser(User user) {
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("This email is already registered");
        }
        return userRepository.save(user);
    }

 
    public void deleteUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email: " + email + " doesn't exist"));
        userRepository.deleteById(user.getId());
    }
}