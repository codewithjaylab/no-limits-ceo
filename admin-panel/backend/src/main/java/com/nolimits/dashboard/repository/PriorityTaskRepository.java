package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.PriorityTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriorityTaskRepository extends JpaRepository<PriorityTask, Long> {
    List<PriorityTask> findByUserUserIdOrderByPriorityOrderAsc(Long userId);
}
