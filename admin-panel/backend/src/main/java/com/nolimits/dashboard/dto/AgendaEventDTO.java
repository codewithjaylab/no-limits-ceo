package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AgendaEventDTO {
    private Long eventId;
    private String title;
    private String description;
    private String startTime;
    private String endTime;
    private String category;
}
