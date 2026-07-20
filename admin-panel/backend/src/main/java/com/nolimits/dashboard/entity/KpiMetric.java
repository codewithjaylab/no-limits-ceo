package com.nolimits.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "kpi_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KpiMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kpi_id")
    private Long kpiId;

    @Column(name = "metric_code", nullable = false, unique = true, length = 50)
    private String metricCode;

    @Column(name = "metric_name", nullable = false, length = 100)
    private String metricName;

    @Column(name = "current_value", nullable = false, precision = 15, scale = 2)
    private BigDecimal currentValue;

    @Column(name = "display_format", nullable = false, length = 20)
    private String displayFormat;

    @Column(name = "delta_percentage", nullable = false, precision = 5, scale = 2)
    private BigDecimal deltaPercentage;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();
}
