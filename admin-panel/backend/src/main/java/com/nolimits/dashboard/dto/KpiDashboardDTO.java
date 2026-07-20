package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KpiDashboardDTO {
    private String metricCode;
    private String metricName;
    private String displayValue;
    private BigDecimal deltaPercentage;
    private List<BigDecimal> sparklineData;
}
