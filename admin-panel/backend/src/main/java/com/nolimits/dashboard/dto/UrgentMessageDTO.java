package com.nolimits.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrgentMessageDTO {
    private Long messageId;
    private String sourceChannel;
    private String title;
    private String body;
    private Boolean isRead;
    private String receivedAt;
}
