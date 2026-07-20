package com.nolimits.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "kpi_historical_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KpiHistoricalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kpi_id", nullable = false)
    private KpiMetric kpiMetric;

    @Column(name = "datapoint_value", nullable = false, precision = 15, scale = 2)
    private BigDecimal datapointValue;

    @Column(name = "recorded_at", nullable = false)
    private OffsetDateTime recordedAt;
}
