package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.KpiHistoricalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KpiHistoricalDataRepository extends JpaRepository<KpiHistoricalData, Long> {
    List<KpiHistoricalData> findByKpiMetricKpiIdOrderByRecordedAtAsc(Long kpiId);
}
