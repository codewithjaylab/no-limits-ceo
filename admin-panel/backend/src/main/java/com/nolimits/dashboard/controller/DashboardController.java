package com.nolimits.dashboard.controller;

import com.nolimits.dashboard.dto.*;
import com.nolimits.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DailySummaryDTO> getDailySummary(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchSummaryByDate(userId, LocalDate.now()));
    }

    @GetMapping("/agenda")
    public ResponseEntity<List<AgendaEventDTO>> getTodayAgenda(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchTodayEvents(userId));
    }

    @GetMapping("/tasks/priority")
    public ResponseEntity<List<PriorityTaskDTO>> getPriorityTasks(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchTopPriorityTasks(userId));
    }

    @GetMapping("/projects/key")
    public ResponseEntity<List<KeyProjectDTO>> getKeyProjects() {
        return ResponseEntity.ok(dashboardService.fetchActiveKeyProjects());
    }

    @GetMapping("/kpis")
    public ResponseEntity<List<KpiDashboardDTO>> getKpiMetrics() {
        return ResponseEntity.ok(dashboardService.calculateLiveKpis());
    }

    @GetMapping("/notifications/urgent")
    public ResponseEntity<List<UrgentMessageDTO>> getUrgentMessages(@RequestParam Long userId) {
        return ResponseEntity.ok(dashboardService.fetchUnreadUrgentMessages(userId));
    }

    @GetMapping("/activity")
    public ResponseEntity<List<TeamActivityDTO>> getRecentActivity() {
        return ResponseEntity.ok(dashboardService.fetchRecentTeamActivities());
    }
}
