package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.DailySummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailySummaryRepository extends JpaRepository<DailySummary, Long> {
    Optional<DailySummary> findByUserUserIdAndSummaryDate(Long userId, LocalDate summaryDate);
}
