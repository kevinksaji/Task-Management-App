package com.example.jarvis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jarvis.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
