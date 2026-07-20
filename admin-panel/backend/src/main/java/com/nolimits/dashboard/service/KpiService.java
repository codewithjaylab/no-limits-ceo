package com.nolimits.dashboard.service;

import com.nolimits.dashboard.dto.KpiDashboardDTO;
import com.nolimits.dashboard.entity.KpiHistoricalData;
import com.nolimits.dashboard.entity.KpiMetric;
import com.nolimits.dashboard.repository.KpiHistoricalDataRepository;
import com.nolimits.dashboard.repository.KpiMetricRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KpiService {

    private final KpiMetricRepository kpiMetricRepository;
    private final KpiHistoricalDataRepository kpiHistoricalDataRepository;

    @Transactional(readOnly = true)
    public List<KpiDashboardDTO> calculateAllKpis() {
        return kpiMetricRepository.findAll()
                .stream()
                .map(this::toDashboardDTO)
                .collect(Collectors.toList());
    }

    private KpiDashboardDTO toDashboardDTO(KpiMetric metric) {
        String displayValue = formatValue(metric.getCurrentValue(), metric.getDisplayFormat());

        List<BigDecimal> sparklineData = kpiHistoricalDataRepository
                .findByKpiMetricKpiIdOrderByRecordedAtAsc(metric.getKpiId())
                .stream()
                .map(KpiHistoricalData::getDatapointValue)
                .collect(Collectors.toList());

        return KpiDashboardDTO.builder()
                .metricCode(metric.getMetricCode())
                .metricName(metric.getMetricName())
                .displayValue(displayValue)
                .deltaPercentage(metric.getDeltaPercentage())
                .sparklineData(sparklineData)
                .build();
    }

    private String formatValue(BigDecimal value, String format) {
        return switch (format.toUpperCase()) {
            case "CURRENCY" -> NumberFormat.getCurrencyInstance(new Locale("es", "MX"))
                    .format(value);
            case "PERCENTAGE" -> value.setScale(1) + "%";
            default -> // NUMBER
                    new DecimalFormat("#,##0").format(value);
        };
    }
}
