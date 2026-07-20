package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.TeamActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamActivityRepository extends JpaRepository<TeamActivity, Long> {
    List<TeamActivity> findTop10ByOrderByLoggedAtDesc();
}
