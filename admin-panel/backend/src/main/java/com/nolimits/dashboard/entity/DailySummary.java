package com.nolimits.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "daily_summaries",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "summary_date"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailySummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summary_id")
    private Long summaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "summary_date", nullable = false)
    private LocalDate summaryDate;

    @Column(name = "key_actions", columnDefinition = "TEXT[]", nullable = false)
    private String[] keyActions;

    @Column(name = "events", columnDefinition = "TEXT[]", nullable = false)
    private String[] events;

    @Column(name = "focus_text", columnDefinition = "TEXT", nullable = false)
    private String focusText;
}
