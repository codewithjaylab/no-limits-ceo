package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeyProjectDTO {
    private Long projectId;
    private String name;
    private Integer progressPercentage;
    private String status;
}
