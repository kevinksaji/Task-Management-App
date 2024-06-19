package com.example.jarvis.controller;

import com.example.jarvis.model.User;
import com.example.jarvis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // Get request to get all usernames, passwords, and emails
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Post request to save username, password, and email
    @PostMapping("/user")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Delete request to delete user by id
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    // Delete all user entries from the database
    @DeleteMapping("/users")
    public String deleteAllUsers() {
        return userService.deleteAllUsers();
    }

    // Get request to get user by username
    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    // post request for user login
    @PostMapping("/user/login")
    public User loginUser(@RequestBody User user) {
        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        } else {
            return null;
        }
    }
}
