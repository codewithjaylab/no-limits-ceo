package com.nolimits.dashboard.repository;

import com.nolimits.dashboard.entity.UrgentMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrgentMessageRepository extends JpaRepository<UrgentMessage, Long> {
    List<UrgentMessage> findByUserUserIdAndIsReadFalseOrderByReceivedAtDesc(Long userId);
}
