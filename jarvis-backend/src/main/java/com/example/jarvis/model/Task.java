package com.example.jarvis.model;

import jakarta.persistence.Entity; // This annotation is used to mark a class as a JPA entity, will be mapped to a table in the database
import jakarta.persistence.GeneratedValue; // This annotation is used to specify the primary key generation strategy for an entity
import jakarta.persistence.GenerationType; // This enum provides strategies for generating primary keys, auto-incremented
import jakarta.persistence.Id; // This annotation is used to specify the primary key of an entity

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String dueDate;
    private String category;
    private String priority;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
