package com.example.jarvis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jarvis.model.Task;
// This interface extends the JpaRepository interface, which provides methods for performing CRUD operations on the Task entity
public interface TaskRepository extends JpaRepository<Task, Long> {
}
