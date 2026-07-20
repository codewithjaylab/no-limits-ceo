package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.KeyProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeyProjectRepository extends JpaRepository<KeyProject, Long> {
    List<KeyProject> findAllByOrderByUpdatedAtDesc();
}
