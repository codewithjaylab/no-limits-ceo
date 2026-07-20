package com.nolimits.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "key_projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KeyProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "progress_percentage")
    private Integer progressPercentage = 0;

    @Column(name = "status", length = 30)
    private String status = "IN_PROGRESS";

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();
}
