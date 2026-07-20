package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamActivityDTO {
    private Long activityId;
    private String teamName;
    private String description;
    private String activityType;
    private String loggedAt;
}
