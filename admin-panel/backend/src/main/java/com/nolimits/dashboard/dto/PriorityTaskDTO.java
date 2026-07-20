package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriorityTaskDTO {
    private Long taskId;
    private String title;
    private Integer progressPercentage;
    private String status;
    private String dueDate;
    private Integer priorityOrder;
}
