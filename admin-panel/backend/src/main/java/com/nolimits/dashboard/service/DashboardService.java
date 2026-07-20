package com.nolimits.dashboard.service;

import com.nolimits.dashboard.dto.*;
import com.nolimits.dashboard.entity.*;
import com.nolimits.dashboard.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DailySummaryRepository dailySummaryRepository;
    private final AgendaEventRepository agendaEventRepository;
    private final PriorityTaskRepository priorityTaskRepository;
    private final KeyProjectRepository keyProjectRepository;
    private final UrgentMessageRepository urgentMessageRepository;
    private final TeamActivityRepository teamActivityRepository;
    private final KpiService kpiService;

    @Transactional(readOnly = true)
    public DailySummaryDTO fetchSummaryByDate(Long userId, LocalDate date) {
        DailySummary summary = dailySummaryRepository
                .findByUserUserIdAndSummaryDate(userId, date)
                .orElse(null);

        if (summary == null) {
            return DailySummaryDTO.builder()
                    .summaryDate(date.format(DateTimeFormatter.ISO_DATE))
                    .keyActions(List.of())
                    .events(List.of())
                    .focusText("No hay resumen disponible para esta fecha.")
                    .build();
        }

        return DailySummaryDTO.builder()
                .summaryId(summary.getSummaryId())
                .summaryDate(summary.getSummaryDate().format(DateTimeFormatter.ISO_DATE))
                .keyActions(Arrays.asList(summary.getKeyActions()))
                .events(Arrays.asList(summary.getEvents()))
                .focusText(summary.getFocusText())
                .build();
    }

    @Transactional(readOnly = true)
    public List<AgendaEventDTO> fetchTodayEvents(Long userId) {
        LocalDate today = LocalDate.now();
        OffsetDateTime startOfDay = today.atStartOfDay(OffsetDateTime.now().getOffset()).toOffsetDateTime();
        OffsetDateTime endOfDay = today.plusDays(1).atStartOfDay(OffsetDateTime.now().getOffset()).toOffsetDateTime();

        return agendaEventRepository
                .findByUserUserIdAndStartTimeBetweenOrderByStartTimeAsc(userId, startOfDay, endOfDay)
                .stream()
                .map(e -> AgendaEventDTO.builder()
                        .eventId(e.getEventId())
                        .title(e.getTitle())
                        .description(e.getDescription())
                        .startTime(e.getStartTime().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                        .endTime(e.getEndTime().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                        .category(e.getCategory())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PriorityTaskDTO> fetchTopPriorityTasks(Long userId) {
        return priorityTaskRepository
                .findByUserUserIdOrderByPriorityOrderAsc(userId)
                .stream()
                .map(t -> PriorityTaskDTO.builder()
                        .taskId(t.getTaskId())
                        .title(t.getTitle())
                        .progressPercentage(t.getProgressPercentage())
                        .status(t.getStatus())
                        .dueDate(t.getDueDate() != null ? t.getDueDate().format(DateTimeFormatter.ISO_DATE) : null)
                        .priorityOrder(t.getPriorityOrder())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<KeyProjectDTO> fetchActiveKeyProjects() {
        return keyProjectRepository
                .findAllByOrderByUpdatedAtDesc()
                .stream()
                .map(p -> KeyProjectDTO.builder()
                        .projectId(p.getProjectId())
                        .name(p.getName())
                        .progressPercentage(p.getProgressPercentage())
                        .status(p.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<KpiDashboardDTO> calculateLiveKpis() {
        return kpiService.calculateAllKpis();
    }

    @Transactional(readOnly = true)
    public List<UrgentMessageDTO> fetchUnreadUrgentMessages(Long userId) {
        return urgentMessageRepository
                .findByUserUserIdAndIsReadFalseOrderByReceivedAtDesc(userId)
                .stream()
                .map(m -> UrgentMessageDTO.builder()
                        .messageId(m.getMessageId())
                        .sourceChannel(m.getSourceChannel())
                        .title(m.getTitle())
                        .body(m.getBody())
                        .isRead(m.getIsRead())
                        .receivedAt(m.getReceivedAt().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TeamActivityDTO> fetchRecentTeamActivities() {
        return teamActivityRepository
                .findTop10ByOrderByLoggedAtDesc()
                .stream()
                .map(a -> TeamActivityDTO.builder()
                        .activityId(a.getActivityId())
                        .teamName(a.getTeamName())
                        .description(a.getDescription())
                        .activityType(a.getActivityType())
                        .loggedAt(a.getLoggedAt().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                        .build())
                .collect(Collectors.toList());
    }
}
