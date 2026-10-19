package com.learningPlatform.LearningPlatform.Controller;

import com.learningPlatform.LearningPlatform.Entity.Purchase;
import com.learningPlatform.LearningPlatform.Services.PurchaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
@CrossOrigin("http://localhost:3000")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    // Get Data By Email
    @GetMapping("email/{email}")
    public List<Purchase> GetDataByEmail(@PathVariable String email){
        return purchaseService.fiendByEmail(email);
    }
    // CREATE PURCHASE
    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.savePurchase(purchase);
    }
}
