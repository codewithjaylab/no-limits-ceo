package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.KpiMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KpiMetricRepository extends JpaRepository<KpiMetric, Long> {
    Optional<KpiMetric> findByMetricCode(String metricCode);
}
