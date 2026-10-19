package com.learningPlatform.LearningPlatform.Repository;

import com.learningPlatform.LearningPlatform.Entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query("SELECT COUNT(p) FROM Purchase p")
    long getTotalPurchases();


    @Query("SELECT p FROM Purchase p WHERE p.userEmail = :userEmail")
    List<Purchase> getDataByEmail(String userEmail);
}
