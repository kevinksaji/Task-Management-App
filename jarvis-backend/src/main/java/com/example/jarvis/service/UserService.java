package com.example.jarvis.service;

import com.example.jarvis.model.User;
import com.example.jarvis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "User removed !! " + id;
    }

    public String deleteAllUsers() {
        userRepository.deleteAll();
        return "All users removed";
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getUserDetails() {
        return userRepository.findAll();
    }
}