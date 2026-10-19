package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.Purchase;
import com.learningPlatform.LearningPlatform.Repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;


    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public List<Purchase> fiendByEmail(String Email){
        return purchaseRepository.getDataByEmail(Email);
    }

    public Purchase savePurchase(Purchase purchase) {

        // 🔹 purchaseId generate → PUR_9001
        long count = purchaseRepository.getTotalPurchases() + 1;
        purchase.setPurchaseId("PUR_" + (9000 + count));

        // 🔹 transactionId generate → TXN + timestamp
        purchase.setTransactionId("TXN" + System.currentTimeMillis());

        // 🔹 fixed fields
        purchase.setPaymentMode("UPI_QR");
        purchase.setStatus("SUCCESS");

        // 🔹 safety (जर frontend ने न पाठवला तर)
        if (purchase.getPurchaseDate() == null) {
            purchase.setPurchaseDate(LocalDateTime.now());
        }
        return purchaseRepository.save(purchase);
    }
}
