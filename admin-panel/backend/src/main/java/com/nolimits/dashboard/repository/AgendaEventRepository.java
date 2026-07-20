package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.AgendaEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendaEventRepository extends JpaRepository<AgendaEvent, Long> {
    List<AgendaEvent> findByUserUserIdAndStartTimeBetweenOrderByStartTimeAsc(
            Long userId,
            java.time.OffsetDateTime start,
            java.time.OffsetDateTime end
    );
}
