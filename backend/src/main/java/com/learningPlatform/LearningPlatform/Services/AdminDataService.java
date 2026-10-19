 package com.learningPlatform.LearningPlatform.Services;

import com.learningPlatform.LearningPlatform.Entity.Admindata;
import com.learningPlatform.LearningPlatform.Repository.ContactMessageRepository;
import com.learningPlatform.LearningPlatform.Repository.CourseRepository;
import com.learningPlatform.LearningPlatform.Repository.PurchaseRepository;
import com.learningPlatform.LearningPlatform.Repository.RegistrationRepo;
import org.springframework.stereotype.Service;


import java.util.List;
// shrira 
@Service
public class AdminDataService {

    private final RegistrationRepo registrationRepo;
    private final CourseRepository courseRepository;
    private final PurchaseRepository purchaseRepository;
    private final ContactMessageRepository contactMessageRepository;


    // ✅ Repositories Inject
    public AdminDataService(
            RegistrationRepo registrationRepo,
            CourseRepository courseRepository,
            PurchaseRepository purchaseRepository,
            ContactMessageRepository contactMessageRepository
    ) {
        this.registrationRepo = registrationRepo;
        this.courseRepository = courseRepository;
        this.purchaseRepository = purchaseRepository;
        this.contactMessageRepository =contactMessageRepository;
    }

    public Admindata get() {

        // ✅ Object create करणे खूप IMPORTANT
        Admindata admindata = new Admindata();

        admindata.setTotalUsers(registrationRepo.count());
        admindata.setTotalCourses(courseRepository.count());
        admindata.setTotalSellCourses(purchaseRepository.count());
        admindata.setTotalFeedback(contactMessageRepository.count()); // static for now

        return admindata;
    }


}
