package com.example.jarvis.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.jarvis.model.Task;
import com.example.jarvis.repository.TaskRepository;
import java.util.Comparator;

@Service
public class TaskService {

    @Autowired // This annotation tells Spring to inject an instance of TaskRepository into this class
    private TaskRepository taskRepository;

    public List<Task> getAllTasks(String sortBy) { 
         List<Task> tasks = taskRepository.findAll();

        if (sortBy != null) {
            switch (sortBy) {
                case "priority":
                    tasks = tasks.stream()
                            .sorted(Comparator.comparing(Task::getPriority))
                            .collect(Collectors.toList());
                    break;
                case "dueDate":
                    tasks = tasks.stream()
                            .sorted(Comparator.comparing(Task::getDueDate))
                            .collect(Collectors.toList());
                    break;
                case "category":
                    tasks = tasks.stream()
                            .sorted(Comparator.comparing(Task::getCategory))
                            .collect(Collectors.toList());
                    break;
            }
        }

        return tasks;
    }
    

    public Task getTaskById(Long id) { // This method returns a task by its id
        return taskRepository.findById(id).orElse(null);
    }

    public Task createTask(Task task) { // This method creates a new task
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) { // This method updates a task by its id
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setName(taskDetails.getName());
            task.setDueDate(taskDetails.getDueDate());
            task.setCategory(taskDetails.getCategory());
            task.setPriority(taskDetails.getPriority());
            return taskRepository.save(task);
        }
        return null;
    }

    public void deleteTask(Long id) { // This method deletes a task by its id
        taskRepository.deleteById(id);
    }

    // delete all tasks
    public void deleteAllTasks() {
        taskRepository.deleteAll();
    }
}
