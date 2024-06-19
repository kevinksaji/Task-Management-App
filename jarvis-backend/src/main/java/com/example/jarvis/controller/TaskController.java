package com.example.jarvis.controller;

import java.util.List; // Collection interface that represents an ordered collection of objects

// These are all Spring annotations and classes that are used for dependency injection and RESTful web services (handling HTTP requests)
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Task is a model class that represents a task object
import com.example.jarvis.model.Task;

// TaskService is a service class that contains the business logic for the task management application
import com.example.jarvis.service.TaskService;

@RestController // This annotation is used to mark a class as a RESTful controller, every method returns a domain object instead of a view
@RequestMapping("/tasks") // This annotation specifies that any HTTP request with the path "/tasks" should be handled by this controller
public class TaskController {

    @Autowired // This annotation is used to inject a dependency (TaskService) into this controller
    private TaskService taskService;

    @GetMapping // This annotation will be used to handle GET requests to the "/tasks" endpoint
    public List<Task> getAllTasks() {
        return taskService.getAllTasks(); // The getallTasks method is called from the TaskService class
    }

    @GetMapping("/{id}") // This annotation will be used to handle GET requests to the "/tasks/{id}" endpoint, so that we can get a task by its id
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task); // This method returns a ResponseEntity with the task object
    }

    @PostMapping // This annotation will be used to handle POST requests to the "/tasks" endpoint, so that we can create a new task
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}") // This annotation will be used to handle PUT requests to the "/tasks/{id}" endpoint, so that we can update a task by its id
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails); // The updateTask method is called from the TaskService class
        if (updatedTask == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}") // This annotation will be used to handle DELETE requests to the "/tasks/{id}" endpoint, so that we can delete a task by its id
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id); // The deleteTask method is called from the TaskService class
        return ResponseEntity.noContent().build(); // This method returns a ResponseEntity with no content
    }

    // delete all tasks
    @DeleteMapping // This annotation will be used to handle DELETE requests to the "/tasks" endpoint, so that we can delete all tasks
    public ResponseEntity<Void> deleteAllTasks() {
        taskService.deleteAllTasks(); // The deleteAllTasks method is called from the TaskService class
        return ResponseEntity.noContent().build(); // This method returns a ResponseEntity with no content
    }
}

