package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailySummaryDTO {
    private Long summaryId;
    private String summaryDate;
    private List<String> keyActions;
    private List<String> events;
    private String focusText;
}
